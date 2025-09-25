import { HeaderCartLink, HeaderLink, Navigation, Options, Profile, LinkLogOut,
  CartHeaderSection, Content, Container, CircleQuantitty } from "./styles";
import { ShoppingCartSimpleIcon, UserIcon } from "@phosphor-icons/react";
import Logo from '../../assets/logo.svg'
import { useNavigate, useResolvedPath } from "react-router-dom";
import { useUser } from "../../hooks/UserContext";
import { useCart } from '../../hooks/CartContext'

export function Header() {
  const navigate = useNavigate(); // Hook para navegação programática
  const { pathname } = useResolvedPath(); // Mostra o caminho atual
  const { logout, userInfo } = useUser();
  const { cartProducts } = useCart()
  function logoutUser() {
    logout(); // Chama a função de logout do hook useUser
    navigate('/login'); // Redireciona para a página inicial após logout
  }
  const { admin: isAdmin } =
    JSON.parse(localStorage.getItem('devburguer:userData')) || {}

  const itemsInCart = cartProducts
    ? cartProducts.reduce((acc, product) => {
        return acc + product.quantity
      }, 0)
    : 0

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <img src={Logo} alt="Logo DevBurguer" style={{ height: 65}} />
            <HeaderLink
              to="/"
              $isActive={pathname === '/'} >Home</HeaderLink>
            <HeaderLink
              to="/cardapio"
              $isActive={pathname === '/cardapio'}
              title="Veja nosso cardápio"
            >Cardápio</HeaderLink>
            {isAdmin && (
              <>
                <HeaderLink
                  to="/admin/pedidos"
                  $isActive={pathname.includes('/admin')}
                  title="Área do administrador"
                >Administrador</HeaderLink>
              </>
            )}
          </div>
        </Navigation>
        <Options>
          <Profile>
            <UserIcon size={22} weight="bold" color="#fff"/>
            <div>
              <p>Olá, <span>{userInfo?.name || 'Desconhecido'}</span>
              <LinkLogOut   onClick={logoutUser}>Sair</LinkLogOut>
              </p>
            </div>
          </Profile>
          <CartHeaderSection $isActive={pathname.includes('/carrinho')}>
            <ShoppingCartSimpleIcon size={24} weight="bold" color="#fff"/>
            <CircleQuantitty>{itemsInCart}</CircleQuantitty>
            <HeaderCartLink to='/carrinho'> Carrinho </HeaderCartLink>
          </CartHeaderSection>
        </Options>
      </Content>
    </Container>
  )
}