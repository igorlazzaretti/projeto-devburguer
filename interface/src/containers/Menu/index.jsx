import { useEffect, useState } from 'react';
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, ReturnButton } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { CardProduct } from '../../components/CardProduct';
import { useLocation, useNavigate } from 'react-router-dom';
import { BackToTop, Footer, Header } from '../../components';


export function Menu() {
  // Estado do React para armazenar as categorias e produtos
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // Navigate é usado para navegar entre rotas
  const navigate = useNavigate();
  // Cateoria Ativa
  //UseLocation
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  // Confições para o useState caso venha da tela Home
  const [activeCategory, setActiveCategory] = useState( () => {
    const categoryId = +queryParams.get('categoria');
    if (categoryId) {
      return categoryId;
    } else {
      return 0; // Retorna 0 se não houver categoria ativa
    }
  });
  // Chama API para buscar as categorias
  useEffect(() => {
    async function loadCategories() {  // Função assíncrona para carregar categorias
      try {
        const { data } = await api.get('/categories');

        // Adiciona a categoria "todas" que possui todos os produtos
        const newCategories = [
          { id: 0, name: 'Todas' }, ...data,
        ];

        setCategories(newCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    async function loadProducts() {
      try {
        const { data } = await api.get('/products');
        // .map Mapeia o array dos produtos e inclui o valor em Reais
        const newProducts = data
          .map(product => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    // Chama as funções para carregar categorias e produtos
    loadCategories();
    loadProducts();
  }, []);
  // Useffect chamado quando a categoria ativa muda
  useEffect(() => {
    if(activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      const newFilteredProducts = products.filter(
        product => product.category_id == activeCategory);
        setFilteredProducts(newFilteredProducts);
    }
  }, [activeCategory, products]);

  return (
    <>
    <Container>
      <Banner>
        <h1> O MELHOR <br/> HAMBURGUER <br/> ESTÁ AQUI <br/>
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>
      <CategoryMenu>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id == activeCategory}
            onClick={() => {
              setActiveCategory(category.id);
              navigate(`/cardapio?categoria=${category.id}`, { replace: true });
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        { filteredProducts.map(product => (
          <CardProduct key={product.id}  product={product}
          />
        ))}
      </ProductsContainer>
      <ReturnButton type="button" onClick={() => navigate('/')}>
        &lt; Voltar
      </ReturnButton>
    </Container>
    <BackToTop/>
  </>
  )
}