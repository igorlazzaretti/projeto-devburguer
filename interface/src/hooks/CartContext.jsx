import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext({});

export const CartProvider = ({children}) => {
  // Armazena os produtos dentro do Carrinho
  const [cartProducts, setCartProducts] = useState([])
  // Adiciona um novo item ao Carrinho
  const putProductInCart = (product) => {
    // Verificando se o produto já esta no carrinho
      // se produto ainda não foi adicionado retorna -1
    const cartIndex = cartProducts.findIndex( (prd) => prd.id === product.id)
    let newProductsInCart = []
  if (cartIndex >= 0) { // se é a primeira veze que adicionamos o produto ao carrinho
    newProductsInCart = cartProducts.map((prd, idx) =>
      idx === cartIndex
        ? { ...prd, quantity: prd.quantity + 1 }
        : prd
    )
    setCartProducts(newProductsInCart)
  } else {
    product.quantity = 1
    newProductsInCart = [...cartProducts, product]
    setCartProducts(newProductsInCart)
  }
    updateLocalStorage(newProductsInCart)
  }
  //Use Efect para ver o Carrinho no console.log
  useEffect( () => {
    // console.log(cartProducts)
  // useEffect( () => {
  //   console.log(cartProducts)

  }, [cartProducts])
  // }, [cartProducts])

  const updateLocalStorage = (products) => {
    localStorage.setItem('devburguer:cartInfo',
      JSON.stringify(products)
    )
  }

  // Limpa o Carrinho e LocalStorag
  const clearCart = () => {
    // usado quando finaliza a compra ou deseja esvaziar o carrinho
    setCartProducts([])
    updateLocalStorage([])
  }
  // Deleta um produto do Carrinho
  const deleteProduct = (productId) => {
    // Filtramos e criamos um novo array
    const newCart = cartProducts.filter( (prd) => prd.id != productId)
    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }
  // Adiciona o número de um mesmo produto
  const increaseProduct = (productId) => {
    // Percorre os produtos e quando encontrar acresce uma quantidade
    const newCart = cartProducts.map((prd) => {
      return prd.id === productId ? {...prd, quantity: prd.quantity + 1} : prd
    })
    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  // Decresce a quantidade de um produto do carrinho
  const decreaseProduct = (productId) => {
    /* Encontra o item -> tira 1 unidade
        Se item igual a 1:
          não faz nada
          ou deleta o produto
    */
    //Encontramos o produto dentro do array
    const cartIndex = cartProducts.findIndex((prd) => prd.id === productId)
    // Verificamos sua quantidade for maior que 1 para diminuir
    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((prd) => {
      return prd.id === productId ? {...prd, quantity: prd.quantity - 1} : prd
      })
      setCartProducts(newCart)
      updateLocalStorage(newCart)
    } else { // Se igual ou menor que 1 deletamos
      deleteProduct(productId)
    }
  }
  // Faz o load do LocalStorage
  useEffect(() => {
    const clienteCartData = localStorage.getItem('devburguer:cartInfo')
    if (clienteCartData) {
      setCartProducts(JSON.parse(clienteCartData))
    }
  },[])

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        putProductInCart,
        clearCart,
        deleteProduct,
        increaseProduct,
        decreaseProduct }} >
      {children}
    </CartContext.Provider>
  )
}
export const useCart = () => {
  // Contexto do Carrinho
  const context = useContext(CartContext)
  // Teste se vazio
  if (!context) {
    throw new Error('useCart must be used with a Context')
  }
  return context
}