import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert(`Hola ${formData.nombre} ${formData.apellido}, gracias por tu mensaje.`);
  };

  return (
    <div
      className="container mt-5 p-4 shadow-sm"
      style={{
        maxWidth: '400px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
      }}
    >
      <h2 className="mb-4 text-center">Formulario de Contacto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label className="fw-bold ">Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formApellido">
          <Form.Label className="fw-bold">Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="fw-bold">Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label className="fw-bold">Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Escribe tu mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTerminos">
          <Form.Check
            type="checkbox"
            label="Aceptar Términos y Condiciones"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Enviar
        </Button>
      </Form>
    </div>
  );
};
