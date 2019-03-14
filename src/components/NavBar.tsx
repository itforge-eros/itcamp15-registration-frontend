import styled from "@emotion/styled";
import { getMajorFromPath } from "../core/util";

const Nav = styled.nav`
  width: 100%;
  background: rgba(34, 37, 66, 0.8);
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0.4em 1em;
  color: white;
  font-size: 2em;
  margin-bottom: 1em;
  @media screen and (max-width: 780px) {
    font-size: 1.6em;
  }
`;

export default () => {
  const major = getMajorFromPath();
  return (
    <Nav>
      <span>สาขา {major ? major[0].toUpperCase() + major.substr(1) : ""}</span>
    </Nav>
  );
};
