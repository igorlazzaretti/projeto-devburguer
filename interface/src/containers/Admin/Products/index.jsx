import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Container, EditButton, ProductImage, DeleteButton } from './styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  CheckCircle,
  Pencil,
  XCircle,
  X as XIcon,
} from '@phosphor-icons/react';
import { formatPrice as FormatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { ModalConfirmDelete } from '../../../components';
import { toast } from 'react-toastify';

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      setProducts(data);
    }
    loadProducts();
  }, []);

  function isOffer(offer) {
    if (offer) {
      return <CheckCircle color="#61a120" size="38" />;
    } else {
      return <XCircle color="#cf3057" size="38" />;
    }
  }

  function editProduct(product) {
    navigate('/admin/editar-produto', { state: { product } });
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  function askDeleteProduct(product) {
    setProductToDelete(product);
    setIsModalOpen(true);
  }

  async function handleConfirmDelete() {
    try {
      await api.delete(`/products/${productToDelete.id}`);
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao deletar o produto.');
    } finally {
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Produto em Oferta</TableCell>
              <TableCell align="center">Image do Produto</TableCell>
              <TableCell align="center">Editar Produto</TableCell>
              <TableCell align="center">Excluir Produto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="product">
                  {product.name}
                </TableCell>
                <TableCell align="center">
                  {FormatPrice(product.price)}
                </TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <Pencil />
                  </EditButton>
                </TableCell>
                <TableCell align="center">
                  <DeleteButton onClick={() => askDeleteProduct(product)}>
                    <XIcon />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalConfirmDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete?.name}
      />
    </Container>
  );
}
