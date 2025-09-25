import PropTypes from 'prop-types';
import { Container, CardImage } from "./styles";
import { CartButton } from '../CartButton'
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/CartContext'
import { toast } from 'react-toastify';

export function CardProduct({ product }) {
  // Envia o produto ao carrinho
  const {putProductInCart} = useCart()

  return (
  <Container>
    <CardImage src={product.url} alt={product.name} />
    <div>
      <p>{product.name}</p>
      <strong>{product.currencyValue}</strong>
    </div>
    <CartButton
      onClick={() => {
        putProductInCart(product);
        toast.success(`${product.name} adicionado(a) ao carrinho`);
      }}
      type="button"
      title={`Adicionar ${product.name} ao carrinho`}
    >
      Adicionar
    </CartButton>
  </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.object
};
