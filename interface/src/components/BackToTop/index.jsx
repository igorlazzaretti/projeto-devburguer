import { useState, useEffect } from "react";
import { Button } from "./styles";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Mostra o botão se houver rolagem
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Função para voltar ao topo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button onClick={scrollToTop}
        alt="Voltar ao topo">
          Ir para o topo
        </Button>
      )}
    </>
  )
}