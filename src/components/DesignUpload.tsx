import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { captureException } from "@sentry/browser";
import { Icon } from "antd";

import { css } from "@emotion/core";

import ReactDropzone from "react-dropzone";
import { message } from "antd";
import * as firebase from "firebase/app";
import Ink from "react-ink";

import withField from "../components/withField";

import logger from "../core/log";
import { UploadProps, UploadState } from "./Upload";

const dropIconStyle = css`
  color: #555;
  font-size: 1.8em;

  margin-bottom: 1em;

  padding: 0.5em;
  border: 1px solid #555;
  border-radius: 50%;
`;
interface DropZoneProps {
  disabled?: boolean;
  preview?: string;
  meta?: {
    error?: boolean;
    touched?: boolean;
  };
}

// prettier-ignore
const DropZoneContainer = styled.div<DropZoneProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-bottom: 3.2em;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 3px 18.5px 2px rgba(0, 0, 0, 0.18);

  margin: 0 auto;
  margin-top: 1.2em;
  margin-bottom: 3.8em;

  width: 100%;
  height: 400px;

  border-radius: 6px;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  ${props => !props.disabled && css`
  cursor: pointer;
  &:hover {
    background: #2c3e50;
    transform: scale(1.045);

    div, i {
      color: white;
      border-color: white;
    }
  }`
  }

  ${(props) => props.preview && css`
    background-image: url(${props.preview});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `};

  ${(props) => props.meta && props.meta.touched && props.meta.error && css`
    border: 5px solid #ee5253;
  `};
`

// prettier-ignore
// const DropIcon = styled(Icon)`
//   color: #555;
//   font-size: 1.8em;

//   margin-bottom: 1em;

//   padding: 0.5em;
//   border: 1px solid #555;
//   border-radius: 50%;
// `

// prettier-ignore
const DropTitle = styled.div`
  color: #555;
  text-align: center;
  font-size: 1.5em;
`

interface OverlayProps {
  active: boolean;
}

// prettier-ignore
const Overlay = styled.div<OverlayProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100%;
  height: 100%;

  ${(props) => props.active && css`
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  `};
`

const DropWarning = styled.div`
  color: #ee5253;
  text-align: center;
  font-size: 1.2em;
`;

class Upload extends Component<UploadProps, UploadState> {
  state: UploadState = {};

  async componentDidMount() {
    if (this.props.uid) {
      await this.loadPreview(this.props.uid);
    }
  }

  async UNSAFE_componentWillReceiveProps(props: UploadProps) {
    if (this.props.uid !== props.uid) {
      const { uid } = props;

      await this.loadPreview(uid);
    }
  }

  loadPreview = async (uid: number) => {
    const storage = firebase.storage().ref();
    const designs = storage.child(`designs/${uid}.jpg`);

    try {
      const url = await designs.getDownloadURL();

      if (url) {
        logger.log("Design URL", url);

        this.setState({ preview: url });

        if (this.props.input) {
          this.props.input.onChange(url);
        }
      }
    } catch (err) {
      if (err.code === "storage/object-not-found") {
        logger.info("Camper", uid, "has not uploaded their designs yet.");
        return;
      }

      logger.warn(err.message);

      captureException(err);
    }
  };

  onDrop = async (acceptedFiles: File[], rejectedFiles: File[]) => {
    const hide = message.loading("กำลังอัพโหลดรูปดีไซน์ กรุณารอสักครู่...", 0);

    if (rejectedFiles.length > 0) {
      logger.warn("Rejected Files:", rejectedFiles);

      hide();
      message.error("รูปดีไซน์ต้องมีขนาดน้อยกว่า 10MB และเป็นไฟล์รูปเท่านั้น");
      return;
    }

    try {
      const { uid, onChange } = this.props;

      if (!uid) {
        hide();
        message.error("ไม่พบผู้ใช้นี้อยู่ในระบบ ไม่สามารถอัพโหลดรูปภาพได้", 0);

        return;
      }

      const storage = firebase.storage().ref();
      const designs = storage.child(`designs/${uid}.jpg`);

      const [file] = acceptedFiles;

      this.setState({ preview: URL.createObjectURL(file) });

      if (onChange) {
        onChange(true);
      }

      const snapshot = await designs.put(file);

      logger.log("Design Photo File:", file);
      logger.log("Uploaded Design Photo:", snapshot);

      if (onChange) {
        onChange(snapshot.downloadURL);
      }

      hide();
      message.success("อัพโหลดรูปสำหรับสาขาดีไซน์เรียบร้อยแล้ว");
    } catch (err) {
      hide();
      message.error(err.message);

      captureException(err);
    }
  };

  render() {
    const { preview } = this.state;
    const { meta, disabled } = this.props;

    return (
      <ReactDropzone
        onDrop={this.onDrop}
        // meta={meta}
        maxSize={10000000}
        multiple={false}
        accept="image/*"
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <DropZoneContainer
            {...getRootProps()}
            preview={preview}
            disabled={disabled}
          >
            <input {...getInputProps()} disabled={disabled} />
            {disabled ? null : (
              <Overlay active={!!preview}>
                <Icon type="upload" css={dropIconStyle} />

                {meta && meta.touched && meta.error ? (
                  <DropWarning>
                    กรุณาอัพโหลด
                    <br />
                    รูปสำหรับคำถามนี้
                  </DropWarning>
                ) : (
                  <DropTitle>อัพโหลดรูปสำหรับคำถามนี้</DropTitle>
                )}
              </Overlay>
            )}
          </DropZoneContainer>
        )}
      </ReactDropzone>
    );
  }
}

const mapStateToProps = (state: any) => ({
  uid: state.user.uid
});

const enhance = connect(mapStateToProps);

export const DesignUpload = enhance(Upload);

export default withField(DesignUpload);
