import React from "react";
import styled from "@emotion/styled";

const Character = styled.img`
  height: 25em;
  transition: 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) scale;
  opacity: 0.5;
  cursor: pointer;
  &.active {
    transform: scale(1.08);
    filter: drop-shadow(0 0px 18px rgba(255, 205, 0, 0.18));
    -webkit-filter: drop-shadow(0 0px 18px rgba(255, 205, 0, 0.18));
    opacity: 1;
  }
  &:hover {
    transform: scale(1.1);
    opacity: 1;
    filter: drop-shadow(0 0px 18px rgba(255, 205, 0, 0.18));
    -webkit-filter: drop-shadow(0 0px 18px rgba(255, 205, 0, 0.18));
  }
`;

interface CharacterCardProps {
  src: string;
  active?: boolean;
  onClick?: any;
}

export default (props: CharacterCardProps) => {
  const { src, active, onClick, ...rest } = props;
  return (
    <Character
      className={active ? "active" : ""}
      src={src}
      onClick={onClick}
      {...rest}
    />
  );
};
