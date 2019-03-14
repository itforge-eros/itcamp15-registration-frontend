import React, { Fragment } from "react";
import { Field } from "redux-form";
import styled from "@emotion/styled";
import withField from "./withField";

const Label = styled.label`
  font-size: 1.2em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  color: #7e8991;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 350px) {
    flex-direction: column !important;
  }
`;

const Topic = styled.label`
  line-height: 1.5;
  font-size: 1.5em;
  font-weight: 400;
  color: #777;
  cursor: text;
  pointer-events: none;
  white-space: pre-line;
  word-break: break-word;
  word-wrap: break-word;
`;

interface RadioGroupProps {
  options: { value: string; label: string }[];
  name: string;
  direction: "row" | "column";
  label: string;
  value: string;
  onChange;
  disabled: boolean;
}

export default withField((props: RadioGroupProps) => {
  const { options, direction, disabled, ...input } = props;
  return (
    <Container style={{ flexDirection: "column" }}>
      <Container style={{ flexDirection: direction }}>
        {options.map((choice, index) => {
          return (
            <Label key={index}>
              <input
                disabled={disabled}
                type="radio"
                {...input}
                value={choice.value}
                checked={choice.value === input.value}
              />
              &nbsp;{choice.label}
            </Label>
          );
        })}
      </Container>
    </Container>
  );
});
