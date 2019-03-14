import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { captureException } from "@sentry/browser";
import { Icon } from "antd";

import { css } from "@emotion/core";

import ReactDropzone from "react-dropzone";
import { message } from "antd";
import * as firebase from "firebase/app";
import { Field } from "redux-form";

import logger from "../core/log";

interface DropZoneProp {
  disabled?: boolean;
  preview?: string;
  meta?: {
    error?: boolean;
    touched?: boolean;
  };
}

// prettier-ignore
const DropZoneContainer = styled.div<DropZoneProp>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-bottom: 3.2em;
  background: rgba(255, 255, 255, 0.94);
  
  margin: 0 auto;
  margin-bottom: 3.8em;
  
  width: 200px;
  height: 200px;
  
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  ${props => !props.disabled && css`
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.045);
  }`}

  ${props => props.preview && css`
    background-image: url(${props.preview});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `};

  ${props => props.meta && props.meta.touched && props.meta.error && css`
    border: 5px solid #ee5253;
  `};
`

const dropIconStyle = css`
  color: #7e8991;
  font-size: 2.2em;
  padding: 0.5em;
`;

const DropTitle = styled.div`
  color: #7e8991;
  text-align: center;
  font-size: 1.75em;
`;

const Small = styled.small`
  color: #7e8991;
  text-align: center;

  font-size: 1.15em;
  margin-top: 0.5em;
`;

const DropWarning = styled.div`
  color: #ee5253;
  text-align: center;
  font-size: 1.2em;
`;

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

  opacity: 1;

  ${props => props.active && css`
    opacity: 0;

    &:hover {
      opacity: 1;
    }
  `};
`

export interface UploadProps {
  onChange?: Function;
  uid: number;
  input?: {
    onChange: Function;
  };
  meta?: {
    touched: boolean;
    error: boolean;
  };
  value?: any;
  disabled?: boolean;
}

export interface UploadState {
  preview?: string;
}

class Upload extends Component<UploadProps, UploadState> {
  state: UploadState = {};
  overlay = createRef<HTMLDivElement>();
  async componentDidMount() {
    await this.loadPreview(this.props.uid);
  }

  // TODO: Refactor to use new lifecycle
  async UNSAFE_componentWillReceiveProps(props: UploadProps) {
    if (this.props.uid !== props.uid) {
      await this.loadPreview(props.uid);
    }
  }

  loadPreview = async (uid: number) => {
    const storage = firebase.storage().ref();
    const avatar = storage.child(`avatar/${uid}.jpg`);

    if (!uid) return;

    try {
      const url = await avatar.getDownloadURL();

      if (url) {
        logger.log("Avatar URL", url);

        this.setState({ preview: url });

        if (this.props.input) {
          this.props.input.onChange(url);
        }
      }
    } catch (err) {
      if (err.code === "storage/object-not-found") {
        logger.info("Camper", uid, "has not uploaded an avatar yet.");
        return;
      }

      logger.warn(err.message);

      captureException(err);
    }
  };

  onDrop = async (acceptedFiles: File[], rejectedFiles: File[]) => {
    const hide = message.loading(
      "กำลังอัพโหลดรูปประจำตัว กรุณารอสักครู่...",
      0
    );

    if (rejectedFiles.length > 0) {
      logger.warn("Rejected Files:", rejectedFiles);

      hide();
      message.error("รูปโปรไฟล์ต้องมีขนาดน้อยกว่า 10MB และเป็นไฟล์รูปเท่านั้น");
      return;
    }

    try {
      const { uid, input } = this.props;

      if (!uid) {
        hide();
        message.error("ไม่พบผู้ใช้นี้อยู่ในระบบ ไม่สามารถอัพโหลดรูปภาพได้", 0);

        return;
      }

      const storage = firebase.storage().ref();
      const avatar = storage.child(`avatar/${uid}.jpg`);

      const [file] = acceptedFiles;
      this.setState({ preview: URL.createObjectURL(file) });

      const snapshot = await avatar.put(file);

      if (input && input.onChange) {
        input.onChange(true);
      }

      logger.log("Avatar File:", file);
      logger.log("Uploaded Avatar:", snapshot);

      if (input && input.onChange) {
        input.onChange(snapshot.downloadURL);
      }
      message.success("อัพโหลดรูปประจำตัวเรียบร้อยแล้ว");
    } catch (err) {
      message.error(err.message);

      captureException(err);
    } finally {
      hide();
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
            ref={this.overlay}
            preview={preview}
            disabled={disabled}
          >
            <input {...getInputProps()} disabled={disabled} />
            {disabled ? null : (
              <Overlay active={!!preview}>
                <Icon type="upload" css={dropIconStyle} />

                {meta && meta.touched && meta.error ? (
                  <DropWarning>อัพโหลด</DropWarning>
                ) : (
                  <DropTitle>อัพโหลด</DropTitle>
                )}

                <Small>รูปที่เห็นหน้าชัดเจน</Small>
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

const AvatarUpload = connect(mapStateToProps)(Upload);

export const UploadField = (props: any) => (
  <Field component={AvatarUpload} {...props} />
);

export default AvatarUpload;
