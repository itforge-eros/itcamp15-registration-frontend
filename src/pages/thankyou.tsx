import React from "react";
import styled from "@emotion/styled";
import Button from "../components/Button";
import { Backdrop, Container, Paper } from "../components/Layout";

const Logo = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 6em 0 3em 0;
`;

const ConfirmText = styled.label`
  color: #e1a34e;
  display: flex;
  align-items: center;
  font-size: 3em;
  @media screen and (max-width: 780px) {
    font-size: 2.4em;
  }
`;

const Text = styled.label`
  color: white;
  font-size: 1.6em;
`;

const Correct = styled.img`
  transform: scale(1.5);
  @media screen and (max-width: 780px) {
    transform: scale(1);
  }
`;

const ButtonContainer = styled.div`
  margin: 2em 0;
`;

const backHandler = () => {
  self.location = "/" as any;
};

const ThankYou = () => (
  <Backdrop>
    <Container>
      <Logo src="/logo/logo.png" />
      <ConfirmText>
        <Correct src="/images/correct.svg" />
        &nbsp;ส่งใบสมัครเรียบร้อย
      </ConfirmText>
      <Text>ประกาศผลวันที่ 24 มีนาคม 2562</Text>
      <Text>โชคดีนะน้อง</Text>
      <ButtonContainer>
        <Button onClick={backHandler}>กลับสู่หน้าหลัก</Button>
      </ButtonContainer>
    </Container>
  </Backdrop>
);

export default ThankYou;
