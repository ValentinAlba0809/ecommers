import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ClientesFormModal = ({ cliente, show, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    cuit: '',
    correo: ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        cuit: cliente.cuit,
        correo: cliente.correo
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Llama a la función para guardar los cambios
    handleClose(); // Cierra el modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{cliente ? 'Editar Cliente' : 'Agregar Cliente'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formClienteName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del cliente"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClienteCuit">
            <Form.Label>CUIT</Form.Label>
            <Form.Control
              type="text"
              name="cuit"
              value={formData.cuit}
              onChange={handleChange}
              placeholder="Ingrese el CUIT del cliente"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formClienteEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingrese el correo del cliente"
              required
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClientesFormModal;
