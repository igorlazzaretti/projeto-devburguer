import Logo from '../../assets/logo.svg';
import { CartItems, CartResume, BackToTop } from '../../components';
import { Banner, Container, Title,Content, ReturnButton } from './styles';
import { useNavigate } from 'react-router-dom';
// import { ReturnButton } from '../../components/ReturnButton';


export function Cart() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Banner>
          <img src={Logo} alt="Logo do DevBurguer"
            style={{ width: "180px" }}/>
        </Banner>
        <Title>Checkout - Pedido</Title>
        <Content>
          <CartItems/>
          <CartResume/>
        </Content>
      </Container>
      <ReturnButton type="button" onClick={() => navigate('/cardapio')}>
        &lt; Cardápio
      </ReturnButton>
    <BackToTop/>
  </>
  )
}