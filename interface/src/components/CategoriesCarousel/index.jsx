import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Title, ContainerItems, CategoryButton } from "./styles";
import { useNavigate } from "react-router-dom";

export function CategoriesCarousel() {
  const [categories, setCategories] = useState([]);


  // Navegação para a página de cardápio
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadCategories();
  }, []);

  // Responsividade do Carrossel exigido pela biblioteca react-multi-carousel
  const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000},
        items: 4,
    },
    desktop: {
        breakpoint: {max: 3000, min: 1280},
        items: 4,
    },
    tablet: {
        breakpoint: {max: 1280, min: 690},
        items: 3,
    },
    mobile: {
        breakpoint: {max: 690, min: 0},
        items: 2,
    },
  };

  return (
    <Container>
      <Title>Categorias</Title>
      <Carousel
          responsive={responsive}
          infinite={true}
          partialVisible={false}
          itemClass="carousel-item"
      >
        {categories.map(({ id, url, name }) => (
          <ContainerItems key={id} $imageurl={url} >
            <CategoryButton
              to={`/cardapio${`?categoria=${id}`}`}
              title={`Ir para o Cardápio de ${name}`}
            >{name}
            </CategoryButton>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  )
}