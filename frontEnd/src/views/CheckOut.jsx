import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const CheckoutForm = ({ onConfirm, formData, onInputChange }) => {
  const handleConfirm = (event) => {
    event.preventDefault();

    const { name, phone, email } = formData;

    const userData = {
      name,
      phone,
      email,
    };

    onConfirm(userData);
  };

  return (
    <div className="ContainerFormCheckout">
      <Form onSubmit={handleConfirm} className="justify-content-center">
        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-4">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Guille Ibañez"
              name="name"
              value={formData.name}
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">Nombre Completo</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 col-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="11 #### ####"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">Celular o personal</Form.Text>
          </Form.Group>
        </Row>

        <Row className="justify-content-center">
          <Form.Group className="mb-3 col-5">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              required
              placeholder="xx@xxx.xx"
              onChange={onInputChange}
            />
            <Form.Text className="text-muted">Validar Email</Form.Text>
          </Form.Group>
        </Row>

        <Button type="submit">Crear Orden</Button>
      </Form>
    </div>
  );
};

export default CheckoutForm;
