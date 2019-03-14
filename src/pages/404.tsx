import React from "react";
import styled from "@emotion/styled";

import Button from "../components/Button";
import { Backdrop, Container, Paper } from "../components/Layout";
import { MAIN_PAGE } from "../common/App";

const Title = styled.h1`
  color: #555;
  margin-bottom: 1em;

  font-size: 2.18em;
  font-weight: 300;
`;

const Landing = () => (
  <Backdrop>
    <Container>
      <Paper>
        <Title>ไม่พบหน้าดังกล่าว | Junior Webmaster Camp</Title>

        <a href={MAIN_PAGE}>
          <Button>กลับสู่เว็บไซต์หลัก</Button>
        </a>
      </Paper>
    </Container>
  </Backdrop>
);

export default Landing;
