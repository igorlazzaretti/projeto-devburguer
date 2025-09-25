import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Title } from "./styles";
import { CardProduct } from "../CardProduct";
import { formatPrice } from "../../utils/formatPrice";

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data } = await api.get('/products');
        // Filtro para obter apenas as ofertas
        // .map Mapeia o array dos produtos e inclui o valor em Reais
        const onlyOffers = data.filter(product => product.offer).map(product => ({
          currencyValue: formatPrice(product.price),
          ...product,
        }));
        setOffers(onlyOffers);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    loadProducts();
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
      <Title>Ofertas do Dia</Title>
      <Carousel
          responsive={responsive}
          infinite={true}
          partialVisible={false}
          itemClass="carousel-item"
      >
        {offers.map((product) =>(
          <CardProduct key={product.id} product={product}/>
        ))}
      </Carousel>
    </Container>
  )
}