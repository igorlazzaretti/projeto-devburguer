import { Elements } from "@stripe/react-stripe-js"
import { useLocation } from "react-router-dom"
import stripePromise from '../../config/stripeConfig'
import { CheckoutForm, } from '../../components'
import { Container } from "./styles"


export function Checkout() {
  const { state: {clientSecret} } = useLocation()
  if (!clientSecret) {
    return (
      <div>Erro, volte ao Carrinho e tente novamente.</div>
    )
  }
  return (
    <>
    <Container>
    <Elements stripe={stripePromise } options={ {clientSecret }}>
      <CheckoutForm />
    </Elements>
    </Container>
    </>
  )
}