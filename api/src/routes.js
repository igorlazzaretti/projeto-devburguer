// const { Router } = require('express');
import { Router } from 'express';
// Multer: imagens
import multer from 'multer';
import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';


import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';
import CreatePaymentIntentController from './app/controllers/CreatePaymentIntentController';



const routes = new Router();
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// Protege as rotas abaixo com o middleware de autenticação
routes.use(authMiddleware);
// Rotas de Produtos
routes.post('/products', upload.single('file'), ProductController.store)
routes.put('/products/:id', upload.single('file'), ProductController.update)
routes.get( '/products', ProductController.index)
routes.delete('/products/:id', ProductController.destroy)
//Rotas de Categorias
routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)
// Rotas de Pedidos (Orders)
routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

// Stripe Payments
routes.post('/create-payment-intent', CreatePaymentIntentController.store)

// module.exports = routes;
export default routes;