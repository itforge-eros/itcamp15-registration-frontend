import React, { Component } from "react";

import majors from "./majors";
import { Major } from "./types";

const isClient = typeof window !== "undefined";

export function getMajorFromPath(pathname?: string) {
  if (!isClient) return "";

  if (!pathname) pathname = window.location.pathname;

  const path = pathname.split("/")[1];

  if (majors.indexOf(path as Major) > -1) {
    return path;
  }
}

export function getStepFromPath(): { major: string; step: number } {
  if (isClient) {
    const match = window.location.pathname.match(/\/(\w+)\/step(\d)/);
    if (match) {
      const [_, major, step] = match;
      if (majors.indexOf(major as Major) > -1) {
        return { major, step: parseInt(step) };
      }
    }
  }

  return { major: "", step: -1 };
}

export const withFocus = (Base: any) =>
  class WrappedInput extends Component {
    input?: HTMLElement = undefined;

    focus = () => {
      if (this.input) {
        this.input.focus();
      }
    };

    render() {
      return <Base ref={el => (this.input = el)} {...this.props} />;
    }
  };
