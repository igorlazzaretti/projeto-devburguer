import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';

import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { orderStatusOptions } from './orderStatus';
import { Filter, FilterOptions } from './styles';
import { toast } from 'react-toastify'

export function Orders() {
  // Pedidos da API
  const [orders, setOrders] = useState([])
  // Pedidos Filtrados
  const [filteredOrders, setFilteredOrders] = useState([])
  // Status Ativo
  const [activeStatus, setActiveStatus] = useState(1)
  // Linhas da tabela
  const [rows, setRows] = useState([])


  useEffect( () => {
    async function loadOrders() {
      const { data } = await api.get('/orders')
      setOrders(data)
      setFilteredOrders(data)
    }
    loadOrders()
  }, [])


  function createData( order ) {
    return {
      name: order.user.name,
      order: order._id,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products,
    };
  }
  useEffect( () => {
    const newRows = filteredOrders.map( order => createData(order) )
    setRows(newRows)
  }, [filteredOrders])

  function handleStatus(status) {
    if(status.id === 1) {
      setFilteredOrders(orders)
    } else {
      const newFilteredOrders = orders.filter( order => order.status === status.label)
      setFilteredOrders(newFilteredOrders)
    }
    setActiveStatus(status.id)
  }
  // useEffect para atualizar as linhas da tabela quando os pedidos filtrados mudam
  useEffect( () => {
    if(activeStatus === 1) {
      setFilteredOrders(orders)
    } else {
      const statusIndex = orderStatusOptions.findIndex(
        (item) => item.id === activeStatus
      )
      const newFilteredOrders = orders.filter(
        order => order.status === orderStatusOptions[statusIndex].label)

      setFilteredOrders(newFilteredOrders)
    }
  }, [orders])

  return (
    <>
    <Filter>
      {orderStatusOptions.map((status) => (
        <FilterOptions key={status.id} onClick={() => handleStatus(status)}
          $isActiveStatus={activeStatus === status.id}>
          {status.label}
        </FilterOptions>
      ))}
    </Filter>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data do Pedido</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.order} row={row}
              orders={orders} setOrders={setOrders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}