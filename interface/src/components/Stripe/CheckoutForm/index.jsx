import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckoutContainer } from "../styles";
import { useCart } from "../../../hooks/CartContext";
import { CheckoutResume } from "../..";
import { api } from "../../../services/api";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { state: {dpmCheckerLink} } = useLocation()

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.error("Stripe.js com falha, tente novamente.");
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    // Teste de Pagamento
    console.log("Log para teste de pagamento", paymentIntent);
    console.log("Log de erro para teste de pagamento", error);

    if (error) {
      if (
        error.code === "payment_intent_unexpected_state" &&
        error.payment_intent?.status === "succeeded"
      ) {
        toast.success("Pagamento já foi realizado com sucesso!");
        setTimeout(() => {
          navigate(
            `/complete?payment_intent_client_secret=${error.payment_intent.client_secret}`
          );
        }, 2000);
        clearCart([]);
      } else if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
        toast.error(error.message);
      } else {
        setMessage("Ocorreu um erro inesperado.");
        toast.error("Ocorreu um erro inesperado.");
      }
    } else if (paymentIntent?.status === "succeeded") {
      const products = cartProducts.map((product) => {
        return { id: product.id, quantity: product.quantity, price: product.price };
      });

      try {
        const { status } = await api.post("/orders", { products }, { validateStatus: () => true });

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
          }, 2000);
          clearCart([]);
          toast.success("Pedido realizado com sucesso!");
        } else if (status === 409) {
          toast.error("Falha ao realizar seu pedido ☹️");
        } else {
          throw new Error();
        }
      } catch (err) {
        toast.error("Pane no sistema, alguém me desconfigurou! Tente novamente! 😢");
      }
    } else if (paymentIntent) {
      // Passa o status atualizado para o cliente
      setTimeout(() => {
        navigate(`/complete?payment_intent_client_secret=${paymentIntent.client_secret}`);
      }, 1000);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <CheckoutContainer>
      <CheckoutResume />
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </CheckoutContainer>
  );
}