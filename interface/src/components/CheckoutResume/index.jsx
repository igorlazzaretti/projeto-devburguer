import { Button } from '../index'
import { Container } from './styles'

import { toast }  from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../../hooks/CartContext'
import { api } from '../../services/api'
import { formatPrice } from '../../utils/formatPrice'

export function CheckoutResume() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(500)
  const navigate = useNavigate()

  const { cartProducts, clearCart} = useCart()

  useEffect(() => {
    const sumAllItens = cartProducts.reduce( (acc, current) => {
      return current.price * current.quantity + acc
    }, 0)
    setFinalPrice(sumAllItens)
  }, [cartProducts])

  const submitOrder = async() => {
    const products = cartProducts.map( (product) => {
      return { id: product.id, quantity: product.quantity, price: product.price }
    })

  try {
    // console.log('Enviando para o backend:', { products });
    const { data } = await api.post('/create-payment-intent', { products })
    // console.log(data)
    // Se o Stripe retorna a intenção guardamos os dados no state
    navigate('/checkout',{
      state: data
    })
  } catch (err) {
    // Exibe o erro específico retornado pelo backend, se houver.
    const errorMessage = err.data?.error || 'Falha no sistema. Tente novamente.';
    toast.error(errorMessage);
    console.error('Erro ao criar a intenção de pagamento:', err.data?.data || err);
  }
}

  return (
    <div>
    <Container>
      <div className="container-top">
        <h2 className="title" >Resumo do Pedido</h2>
        <p className="items" >Itens</p>
        <p className="items-price" >{formatPrice(finalPrice)}</p>
        <p className="delivery-tax" >Taxa de Entrega</p>
        <p className="delivery-tax-price" >{formatPrice(deliveryTax)}</p>
      </div>
      <div className="container-bottom">
        <p>Total:</p>
        <p>{formatPrice(finalPrice + deliveryTax)}</p>
      </div>
    </Container>
    </div>
  )
}