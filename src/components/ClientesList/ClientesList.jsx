import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientesFormModal from '../ClientesForm/ClientesForm';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useAuth } from "../context/AuthContext"; 

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCliente, setEditCliente] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth(); 
  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setError('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCliente = async (cliente) => {
    try {
      await axios.post('http://localhost:3000/cliente', cliente);
      await fetchClientes(); // Recargar la lista completa
    } catch (error) {
      console.error('Error adding client:', error);
      setError('Error al agregar el cliente');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdateCliente = async (id, updatedCliente) => {
    try {
      await axios.put(`http://localhost:3000/clientes/${id}`, updatedCliente);
      await fetchClientes(); // Recargar la lista completa
    } catch (error) {
      console.error('Error updating client:', error);
      setError('Error al actualizar el cliente');
    } finally {
      setShowModal(false);
      setEditCliente(null);
    }
  };

  const handleDeleteCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/clientes/${id}`);
      await fetchClientes(); // Recargar la lista completa
    } catch (error) {
      console.error('Error deleting client:', error);
      setError('Error al eliminar el cliente');
    }
  };

  const handleEditClick = (cliente) => {
    setEditCliente(cliente);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditCliente(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      {user ? (<div>{error && <div className="alert alert-danger">{error}</div>}
      <Button onClick={() => setShowModal(true)} className="mb-3">Agregar Cliente</Button>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>CUIT</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.cliente_id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.cuit}</td>
              <td>{cliente.correo}</td>
              <td>
                <Button className="mx-2" onClick={() => handleEditClick(cliente)}>Editar</Button>
                <Button onClick={() => handleDeleteCliente(cliente.cliente_id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ClientesFormModal
        cliente={editCliente}
        show={showModal}
        handleClose={handleModalClose}
        onSave={editCliente ? (updatedCliente) => handleUpdateCliente(editCliente.cliente_id, updatedCliente) : handleAddCliente}
      /></div>):(<div className="alert alert-warning" role="alert">
        Necesitas <a href="/auth/login" className="alert-link">loguearte</a> para ver este sitio
      </div>)}
      
    </div>
  );
};

export default ClienteList;
