import styled from "@emotion/styled";

import { css } from "@emotion/core";

import withField from "./withField";

interface IMeta {
  touched: boolean;
  error: boolean;
}
// prettier-ignore
export const TextInput = styled.input<{meta: IMeta}>`
  text-align: left;
  font-size: 18px;
  line-height: 1.2em;
  width: 100%;
  padding: 0.15em 0.6em;
  letter-spacing: 0.01em;
  min-width: 10em;
  min-height: 40px;
  outline: none;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  background: white;
  color: #555;

  @media screen and (max-width: 840px) {
    width: 100%;
  }

  &::placeholder {
    font-family: Pridi;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    font-size: 18px;
    letter-spacing: 0.01em;
    color: #E0E0E0;
  }

  &:hover:enabled {
    // box-shadow: 0 3px 18.5px 2px #F1E9FF;
    border-bottom: 2px rgb(250, 185, 97) solid;
  },
  &:active:enabled {
    // transform: scale(1.005);
    // box-shadow: 0 3px 18.5px 2px rgba(0, 0, 0, 0.18);
    // box-shadow: 0 0 0 2px rgba(24,144,255,.4);
  }

  &:focus + label {
    transform: translateY(-40px) scale(1);
  }

  &:disabled {
    border: none;
    background: #f5f5f5; 
  }

  ${props => props.meta.touched && props.meta.error && css`
    border-bottom: 2px solid #e74c3c;
  `};
`

export default withField(TextInput);
