import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ProductImage, SelectStatus } from './styles';
import { orderStatusOptions as options } from './orderStatus';
import { api } from '../../../services/api';
import { toast } from 'react-toastify'

export function Row({ row, setOrders, orders }) {
  // console.log('row',row)
  // console.log('options',options)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
 // console.log('Row',row)
  async function newStatusOrder(id, status) {
    try {
    setLoading(true)
    await api.put(`orders/${id}`, { status })

    const orderUpdate = orders.map( order => order._id === id ? {...order, status} : order)
    setOrders(orderUpdate)
    toast.success(`Status do pedido ${id} alterado para "${status}".`)
  } catch(err) {
    console.error(err)
    toast.error('Erro ao atualizar status do pedido. Tente novamente.')
  } finally {
    setLoading(false)
  }
}

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.order}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <SelectStatus
            menuPortalTarget={document.body}
            styles={{ menuPortal: (provided) => ({ ...provided, zIndex: 9999 }) }}
            options={options.filter((status) => status.id !== 1)}
            placeholder='Status do Pedido'
            defaultValue={options.find(option =>
              option.value === row.status)}
            onChange={
              (status) => newStatusOrder(row.order, status.value)}
            isLoading={loading}
            />
          </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dados deste Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <ProductImage src={product.url} alt={`Imagem de ${product.name}`} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );

}

Row.propTypes = {
  setOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  row: PropTypes.shape({
    order: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
}