import { Route, Routes } from 'react-router-dom';

import {
  Login,
  Register,
  Home,
  Menu,
  Cart,
  Checkout,
  CompletePayment,
  EditProduct,
  NewProduct,
  Products,
  Orders
} from '../containers';
import { UserLayout } from '../layout/UserLayout';
import { AdminLayout } from '../layout/AdminLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />

    <Route path="/admin" element={<AdminLayout />}>
        <Route path="pedidos"        element={<Orders />} />
        <Route path="novo-produto"   element={<NewProduct />} />
        <Route path="editar-produto" element={<EditProduct />} />
        <Route path="produtos"       element={<Products />} />
    </Route>

      <Route path="/" element={<UserLayout />}>
        <Route path="/"         element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete" element={<CompletePayment />} />
      </Route>
    </Routes>
  );
}

// export const router = createBrowserRouter([
//     {
//         path: '/',
//         element: (
//             <>
//             <Header />
//             <Home />
//             </>
//         )
//     },
//     {
//         path: '/login',
//         element: <Login />,
//     },
//     {
//         path: '/cadastro',
//         element: <Register />
//     },
//     {
//         path: '/cardapio',
//         element: <Menu />
//     },
//     {
//         path: '/carrinho',
//         element: <Cart />
//     },
//     {
//         path: '/checkout',
//         element: <Checkout />
//     },
//     {
//         path: '/complete',
//         element: <CompletePayment />
//     }
// ]);
