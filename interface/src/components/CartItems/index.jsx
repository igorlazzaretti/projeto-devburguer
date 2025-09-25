import { Table } from '../index'
import { useCart } from '../../hooks/CartContext'
import TrashIcon from '../../assets/trash.svg'
import { toast } from 'react-toastify'
import { formatPrice } from '../../utils/formatPrice';
import { ProductImage, ButtonGroup, EmptyCart, TotalPrice, TrashImage } from './styles';

export function CartItems() {
  const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } = useCart()

  return (
    <Table.Root>
      <Table.Header>
        <Table.Tr>
          <Table.Th ></Table.Th>
          <Table.Th>Itens</Table.Th>
          <Table.Th>Preço</Table.Th>
          <Table.Th>Quantidade</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th>Delete</Table.Th>
        </Table.Tr>
      </Table.Header>

      <Table.Body>
        {cartProducts?.length ? (
          cartProducts.map(product => (
            <Table.Tr key={product.id}>
              <Table.Td>
                <ProductImage src={product.url}/>
                </Table.Td>
              <Table.Td>{product.name}</Table.Td>
              <Table.Td>{product.currencyValue}</Table.Td>
              <Table.Td>
                <ButtonGroup>
                  <button onClick={ () => {
                    decreaseProduct(product.id);
                    if(product.quantity === 1) {
                      toast.error(`${product.name} removido(s) do carrinho`)
                    } else {
                    toast.error(`Um ${product.name} decrescido(s) do carrinho`)}}}>-</button>
                  {product.quantity}
                  <button onClick={ () => {
                    increaseProduct(product.id);
                    toast.success(`Um ${product.name} acrescido(s) ao carrinho`)}}>+</button>
                </ButtonGroup>
              </Table.Td>
              <Table.Td>
                <TotalPrice>{formatPrice(product.quantity * product.price)}</TotalPrice>
              </Table.Td>
              <Table.Td>
                <TrashImage
                  src={TrashIcon}
                  alt="Lixeira"
                  onClick={() => {
                    deleteProduct(product.id);
                    toast.error(`${product.name} removido(s) do carrinho`) }}
                />
              </Table.Td>

            </Table.Tr>
          ))
        ) : ( <EmptyCart>Carrinho Vazio 😢</EmptyCart> )}
      </Table.Body>


    </ Table.Root>
  )
}
