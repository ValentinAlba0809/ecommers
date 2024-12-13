import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const SupplierFormModal = ({ supplier, show, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    categoria: '' 
  });

  useEffect(() => {
    if (supplier) {
      setFormData({
        nombre: supplier.nombre,
        telefono: supplier.telefono,
        correo: supplier.correo,
        categoria: supplier.categoria 
      });
    } else {
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        categoria: '' 
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
    console.log(typeof formData)
    handleClose(); 
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{supplier ? 'Editar Proveedor' : 'Agregar Proveedor'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSupplierName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSupplierPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono" 
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ingrese el teléfono del proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSupplierEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese el correo del proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSupplierCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              as="select"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoria</option>
              <option value="3">Notebook</option>
              <option value="1">Celular</option>
              <option value="2">Tablet</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierFormModal;
