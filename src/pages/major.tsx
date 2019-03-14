import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { compose, branch } from "recompose";
import { Spin } from "antd";
import { Redirect } from "@reach/router";

import { Heading, Container, Backdrop, Paper } from "../components/Layout";

import { getMajorFromPath } from "../core/util";

import { login, logout } from "../ducks/user";
import { log } from "../core/log";

const Major = styled.span`
  text-transform: capitalize;
`;

const Splash = ({ children }) => (
  <Backdrop>
    <Container>
      <Paper>
        <Heading style={{ margin: 0, marginBottom: "1.5em", color: "black" }}>
          {children}
        </Heading>

        <Spin size="large" />
      </Paper>
    </Container>
  </Backdrop>
);

const Authenticating = props => (
  <Splash>
    กรุณาเข้าสู่ระบบด้วย Facebook เพื่อสมัครเข้าสาขา
    <Major> {getMajorFromPath()}</Major>
  </Splash>
);

const Loading = props => (
  <Splash>
    กำลังยืนยันตัวตนเพื่อสมัครเข้าสาขา
    <Major> {getMajorFromPath()} </Major>
    กรุณารอสักครู่
  </Splash>
);

const Redirection = props => {
  const major = getMajorFromPath();

  log("Your Major is", major);

  if (major) {
    return <Redirect to={`/${major}/step1`} />;
  }

  return <Loading {...props} />;
};

const mapStateToProps = state => ({
  user: state.user,
  loading: state.user.loading,
  authenticating: state.user.authenticating
});

const enhance = compose(
  connect(
    mapStateToProps,
    { login, logout }
  ),
  branch<{ authenticating: boolean }>(
    props => props.authenticating,
    () => Authenticating
  ),
  branch<{ loading: boolean }>(props => props.loading, () => Loading)
);

export default enhance(Redirection);
