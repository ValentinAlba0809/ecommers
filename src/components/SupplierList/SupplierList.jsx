import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SupplierFormModal from '../SupplierForm/SupplierForm'; 
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useAuth } from "../context/AuthContext"; 

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editSupplier, setEditSupplier] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/proveedores'); 
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('Error al cargar los proveedores');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async (supplier) => {
    try {
      await axios.post('http://localhost:3000/proveedor', supplier); 
      await fetchSuppliers(); 
    } catch (error) {
      console.error('Error adding supplier:', error);
      setError('Error al agregar el proveedor');
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdateSupplier = async (id, updatedSupplier) => {
    try {
      await axios.put(`http://localhost:3000/proveedor/${id}`, updatedSupplier); 
      await fetchSuppliers(); 
    } catch (error) {
      console.error('Error updating supplier:', error);
      setError('Error al actualizar el proveedor');
    } finally {
      setEditSupplier(null);
      setShowModal(false);
    }
  };

  const handleDeleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/proveedor/${id}`); 
      await fetchSuppliers(); 
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setError('Error al eliminar el proveedor');
    }
  };

  const handleEditClick = (supplier) => {
    setEditSupplier(supplier);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditSupplier(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lista de Proveedores</h1>
      {user ? (<>{error && <div className="alert alert-danger">{error}</div>}
      <Button onClick={() => setShowModal(true)} className="mb-3">Agregar Proveedor</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>categoria</th>
            <th>Acciones</th>
            
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.proveedor_id}>
              <td>{supplier.nombre}</td>
              <td>{supplier.telefono}</td>
              <td>{supplier.correo}</td>
              <td>{supplier.categoria_nombre}</td>
              <td>
                <Button className="mx-2" onClick={() => handleEditClick(supplier)}>Editar</Button>
                <Button onClick={() => handleDeleteSupplier(supplier.proveedor_id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SupplierFormModal
        supplier={editSupplier}
        show={showModal}
        handleClose={handleModalClose}
        onSave={editSupplier ? (updatedSupplier) => handleUpdateSupplier(editSupplier.proveedor_id, updatedSupplier) : handleAddSupplier}
      /></>):(<div className="alert alert-warning" role="alert">
        Necesitas <a href="/auth/login" className="alert-link">loguearte</a> para ver este sitio
      </div>)}
      
    </div>
  );
};

export default SupplierList;
