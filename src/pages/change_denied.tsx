import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { Link } from "@reach/router";

import Button from "../components/Button";
import {
  Backdrop,
  Container,
  Row,
  Heading,
  HeadingFrame
} from "../components/Layout";
import { MAIN_PAGE } from "../common/App";
import ChangeMajorButton from "../components/ChangeMajorButton";
import CharacterCard from "../components/CharacterSelector/CharacterCard";

const ChangeDenied = ({ camper }) => (
  <Backdrop>
    <Container>
      <HeadingFrame>
        <Heading style={{ marginTop: "0.3em" }}>เลือกสาขา</Heading>
      </HeadingFrame>
      {camper.major ? (
        <Fragment>
          <Row style={{ marginBottom: "2em" }}>
            <CharacterCard active={true} src={`/images/${camper.major}.png`} />
          </Row>
          <Row>
            <Heading>
              สมัครสมาชิกต่อในสาขา{" "}
              {camper.major[0].toUpperCase() + camper.major.substr(1)} ?{" "}
            </Heading>
          </Row>
          <Row style={{ margin: "2em 0" }}>
            <Link to={"/" + camper.major + "/step1"}>
              <Button disabled={!camper.major}>ตกลง</Button>
            </Link>
          </Row>
        </Fragment>
      ) : null}
      <Row style={{ marginBottom: "2.8em" }}>
        <ChangeMajorButton field={camper.major} />
      </Row>
    </Container>
  </Backdrop>
);

const mapStateToProps = state => ({
  camper: state.camper
});

const enhance = connect(mapStateToProps);

export default enhance(ChangeDenied);
