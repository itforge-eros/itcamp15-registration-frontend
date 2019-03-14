import React from "react";
import styled from "@emotion/styled";

import { css } from "@emotion/core";

import { Field, BaseFieldProps } from "redux-form";
import { Fields } from "../core/form";

interface FieldContainerProps {
  wordy?: boolean;
}

// prettier-ignore
const Container = styled.div<FieldContainerProps>`
  position: relative;
  font-size: 1rem;

  width: 100%;
  margin: 1.4em 0em;

  ${props => props.wordy && css`
    margin: 0.4em 0em;
  `};
`

type LabelProps = {
  float: boolean;
  meta: {
    error: boolean;
    touched: boolean;
  };
} & FieldContainerProps;

// prettier-ignore
const Label = styled.label<LabelProps>`
  position: absolute;
  top: 0.5em;
  left: calc(0.625em + 3px);
  z-index: 1;
  font-family: Pridi;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 18px;
  letter-spacing: 0.01em;
  color: #223442;
  cursor: text;
  pointer-events: none;
  transition: 0.2s ease-out all;
  white-space: pre-line;
  word-break: break-word;
  word-wrap: break-word;

  ${props => props.float && css`
    left: 0;
    color: inherit;
    transform: translateY(-40px) scale(1);
  `};

  ${props => props.wordy && css`
    position: static;
    display: block;

    margin-bottom: 0.6em;
    transform: none !important;
    pointer-events: all;
  `};

  ${props => props.meta.touched && props.meta.error && css`
    color: #e74c3c;
  `};
`

const ErrorMessage = styled.div`
  position: absolute;
  font-size: 0.9em;
  bottom: 15%;
  right: 5%;

  color: #ee5253;
  font-weight: 600;

  pointer-events: none;
`;

interface FieldWrapperProps {
  label?: string;
  input?: any;
  meta?: any;
  float?: boolean;
  wordy?: boolean;
}

const wrap = (Component: React.ComponentType) => ({
  label,
  input,
  meta,
  float,
  wordy,
  ...props
}: FieldWrapperProps) => (
  <Container wordy={wordy}>
    <Label float={input.value || float} wordy={wordy} meta={meta}>
      {label}
    </Label>

    <Component meta={meta} {...props} {...input} />

    {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
  </Container>
);

const withField = Component => {
  const InputField = wrap(Component);

  return (
    props: BaseFieldProps &
      FieldWrapperProps & {
        name: keyof Fields;
        type?: "email" | "text" | "number";
        placeholder?: string;
        direction?: "row" | "column";
      }
  ) => {
    return <Field<{}> component={InputField as any} {...props} />;
  };
};

export default withField;
