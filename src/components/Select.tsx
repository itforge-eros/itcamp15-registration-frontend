import React, { ChangeEvent } from "react";
import Select from "react-select";
import styled from "@emotion/styled";
import c from "classnames";

import withField from "./withField";
import { isOptionDisabled } from "react-select/lib/builtins";

type Option = { value: string; label: string };

function getValue(value: string, options: Option[]) {
  if (!value) return null;

  const item = options.find(x => x.value === value);

  return {
    value,
    label: item ? item.label : value
  };
}

const CustomSelect = withField(props => {
  const { options, value, onChange , isDisabled} = props;

  const currentValue = options.filter(option => option.value === value);

  return (
    <Select<Option>
      {...props}
      className={c(
        "custom-select",
        props.meta &&
          props.meta.touched &&
          props.meta.error &&
          "custom-select-error"
      )}
      classNamePrefix="custom-select"
      value={currentValue}
      onBlur={() => {}}
      onChange={v => v && onChange(v['value'])}
      isSearchable
      isDisabled={isDisabled}
    />
  );
});

export default props => (
  <CustomSelect {...props} float placeholder="กรุณาเลือก..." />
);
