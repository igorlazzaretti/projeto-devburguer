import { navLinks } from './navLinks'
import Logo from '../../assets/logo.svg'
import { SignOut, House } from '@phosphor-icons/react'
import { useUser } from '../../hooks/UserContext'
import { Container, NavLinksContainer, Footer, NavLink } from './styles'
import { useResolvedPath } from 'react-router-dom'


export function SideNavAdmin() {
  const { logout } = useUser()
  const { pathname } = useResolvedPath()
  // console.log('pathname:',pathname)

  return  (
    <Container>
      <img src={Logo} alt="DevBurguer Logo" />
      <NavLinksContainer>
        {navLinks.map( (link) => (
          <NavLink
            key={link.id}
            to={link.path}
            $isActive={pathname === link.path}>
                  {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinksContainer>
      <Footer>
        <NavLink to='/'>
          <House />
          <span>Home</span>
        </NavLink>
        <NavLink to='/login' onClick={logout}>
          <SignOut />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  )
}