import React from "react";

import { FormContainer, Paper, Row } from "./Layout";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

import withWizard from "../core/form";
import { prev } from "../core/step";

import styled from "@emotion/styled";
import TextArea from "./TextArea";
import ChangeMajorButton from "./ChangeMajorButton";
import TransparentButton from "./TransparentButton";

const Col = styled.div`
  padding: 0px 0.5em;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 650px) {
    font-size: 0.9em;
  }
  @media screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`;

const Underline = styled.div`
  content: "";
  width: 100%;
  height: 1px;
  margin-top: 1em;
  margin-bottom: 3em;
  bottom: 0;
  left: 0;
  background-color: #e0e0e0;
`;
const toOptions = i => ({ value: i, label: i });

const Options = options =>
  Object.entries(options).map(([value, label]) => ({ value, label }));

export const shirtSizes = {
  XS: "XS (รอบอก 31 นิ้ว ความยาว 25 นิ้ว)",
  S: "S (รอบอก 36 นิ้ว ความยาว 28 นิ้ว)",
  M: "M (รอบอก 38 นิ้ว ความยาว 28.5 นิ้ว)",
  L: "L (รอบอก 42 นิ้ว ความยาว 30 นิ้ว)",
  XL: "XL (รอบอก 44 นิ้ว ความยาว 30.5 นิ้ว)",
  XXL: "XXL (รอบอก 48 นิ้ว ความยาว 32 นิ้ว)"
};
const shirtSizeOptions = Options(shirtSizes);

const ParentalForm = ({ next, handleSubmit }) => (
  <FormContainer onSubmit={handleSubmit}>
    <Paper>
      <Row>
        <Col>
          <Input wordy name="disease" label="โรคประจำตัว (ถ้าไม่มีใส่ -)" />
        </Col>
        <Col>
          <Input
            wordy
            placeholder="แป้ง ถั่ว กระเทียม ฯลฯ"
            name="foodAllergy"
            label="สิ่งที่แพ้ / อาหารที่แพ้ (ถ้าไม่มีใส่ -)"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input wordy name="drugAllergy" label="ยาที่แพ้ (ถ้าไม่มีใส่ -)" />
        </Col>
        <Col>
          <Select
            wordy
            name="shirtSize"
            label="ไซส์เสื้อ"
            options={shirtSizeOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TextArea
            wordy
            placeholder="เล่าเกี่ยวกับสิ่งที่เคยทำเหล่านั้น ..."
            name="activity"
            label="กิจกรรมที่เข้าร่วมหรือผลงานที่เคยทำ เช่น ค่าย เวทีประกวด การแสดง ฯลฯ"
          />
        </Col>
      </Row>
      <Underline />
      <Row>
        <Col>
          <Input
            wordy
            placeholder="ลิลลี่"
            name="parentFirstName"
            label="ชื่อผู้ปกครอง"
          />
        </Col>
        <Col>
          <Input
            wordy
            placeholder="พอตเตอร์"
            name="parentLastName"
            label="นามสกุล"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            wordy
            placeholder="บิดา มารดา ฯลฯ"
            name="parentRelation"
            label="ความเกี่ยวข้อง"
          />
        </Col>
        <Col>
          <Input
            wordy
            placeholder="0898765432"
            name="parentPhone"
            label="เบอร์โทรศัพท์"
          />
        </Col>
      </Row>
    </Paper>

    <Row style={{ marginBottom: "2em" }}>
      <ButtonGroup>
        <TransparentButton
          arrow="left"
          onClick={prev}
          style={{ marginRight: "0.8em" }}
          type="button"
        >
          ก่อนหน้า
        </TransparentButton>

        <Button
          onClick={next}
          type="submit"
          arrow="right"
          style={{ marginLeft: "0.8em" }}
        >
          ถัดไป
        </Button>
      </ButtonGroup>
    </Row>
    <Row style={{ marginBottom: "2.8em" }}>
      <ChangeMajorButton />
    </Row>
  </FormContainer>
);

export default withWizard(ParentalForm);
