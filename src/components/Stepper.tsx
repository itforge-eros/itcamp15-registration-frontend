import React, { Fragment } from "react";
import styled from "@emotion/styled";

const Container = styled.div`
    display: flex;
    flex-flow row nowrap;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 3em;
`;

const Connector = styled.div`
  height: 0;
  min-width: 48px;
  border-top: 4px solid;
  border-color: white;
  margin: 0 4px;
  &.active {
    border-color: #e1a34e;
  }
`;

const Node = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  position: relative;
  background: white;
  &.active {
    background: #e1a34e;
  }
  &.current::after {
    content: "";
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    background: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
`;

const Label = styled.label`
  position: absolute;
  bottom -2em;
  left: 50%;
  white-space: nowrap;
  font-weight: light;
  color: white;
  transform: translateX(-50%);
  &.active {
      color: #e1a34e;
  }
`;

interface StepperProps {
  steps: string[];
  currentStep: string;
}

export default (props: StepperProps) => {
  const { steps, currentStep } = props;
  const stepIndex = steps.findIndex(step => step === currentStep);
  return (
    <Container>
      {steps.map((step, i) => {
        return (
          <Fragment key={i}>
            {i === 0 ? null : (
              <Connector className={i <= stepIndex ? "active" : ""} />
            )}
            <Node
              className={[
                i <= stepIndex ? "active" : "",
                i == stepIndex ? "current" : ""
              ].join(" ")}
            >
              <Label className={i <= stepIndex ? "active" : ""}>{step}</Label>
            </Node>
          </Fragment>
        );
      })}
    </Container>
  );
};
