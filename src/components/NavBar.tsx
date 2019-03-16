import styled from '@emotion/styled'
import {getMajorFromPath} from '../core/util'

const Nav = styled.nav`
  width: 100%;
  background: rgba(34, 37, 66, 0.8);
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0.4em 1em;
  color: white;
  font-size: 2em;
  margin-bottom: 1em;
  @media screen and (max-width: 780px) {
    font-size: 1.6em;
  }
`

export default () => {
  const major = getMajorFromPath()

  enum Camps {
    app = 'Appermort',
    game = 'GrindelGame',
    data = 'Dragota',
    iot = 'Dobby of Things',
    network = 'Netherine'
  }

  return (
    <Nav>
      <span>Logout</span>
      <span>ค่าย {major ? Camps[major] : ''}</span>
    </Nav>
  )
}
