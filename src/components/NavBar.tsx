import styled from '@emotion/styled'
import {getMajorFromPath} from '../core/util'
import {connect} from 'react-redux'
import {compose} from 'recompose'
import {logout} from '../ducks/user'

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
const LogoutButton = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const NavBar = props => {
  const major = getMajorFromPath()

  const {logout} = props

  enum Camps {
    app = 'Appermort',
    game = 'GrindelGame',
    data = 'Dragota',
    iot = 'Dobby of Things',
    network = 'Netherine'
  }

  return (
    <Nav>
      <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
      <span>ค่าย {major ? Camps[major] : ''}</span>
    </Nav>
  )
}

const enhance = compose(
  connect(
    () => ({}),
    {logout}
  )
)

export default enhance(NavBar)
