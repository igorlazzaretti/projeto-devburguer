import * as Yup from 'yup';
import Order from '../schemas/Order';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class OrderController {
    async store(req, response) {
        const schema = Yup.object({
            products:  Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                })
            ),
        })
        try {
            await schema.validate(req.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { products } = req.body;

        // Buscando os dados dos produtos no banco de dados
        // Retorna os Ids dos produtos
        const productsIds = products.map(product => product.id);
        // Retorna os dados dos produtos que possuem os Ids do Pedido
        const findProducts = await Product.findAll({
            where: {
                id: productsIds
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }
            ]
        });
        // Formata os dados dos produtos para serem retornados para o Usuário
        const formattedProducts = findProducts.map(product => {
            // Verifica o Id do produto para informar a quantidade
            const productIndex = products.findIndex(item => item.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category. name,
                url: product.url,
                quantity: products[productIndex].quantity,
            }
        return newProduct;
        });

        const order = {
            user: {
                id: req.userId,
                name: req.userName,
            },
            productsIds,
            products: formattedProducts,
            status: 'Pedido realizado',
        }
        // Criando o pedido no banco de dados
        const createdOrder = await Order.create(order);

        return response.status(201).json(createdOrder)
    }
    // Lista os pedidos
    async index(request, response) {
        const orders = await Order.find();

        return response.json(orders);
    }
    // Atualiza o status do pedido
    async update(request, response) {
        // Validamos se esta sendo atualizado o status do pedido
        const schema = Yup.object({
            status:  Yup.string().required()
        })
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }
        // Verifica se o usuário é um administrador
        const {admin: isAdmin} = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = request.params;
        const { status } = request.body;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }

        return response.json({ message: 'Status updated sucessfuly.' });
    }
}

export default new OrderController();