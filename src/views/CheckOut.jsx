// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';

// const CheckoutForm = ({ onConfirm, formData, onInputChange }) => {
//   const handleConfirm = (event) => {
//     event.preventDefault();

//     const { name, phone, email } = formData;

//     const userData = {
//       name,
//       phone,
//       email
//     };

//     onConfirm(userData); 
//   };
// console.log("formdata" ,formData)
//   return (
//     <div className='ContainerFormCheckout'>
      
      
//       <Form onSubmit={handleConfirm} className='justify-content-center'>
//         <Row className='justify-content-center'>
//           <Form.Group className="mb-3 col-4">
//             <Form.Label>Nombre</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='Guille Ibañez'
//               name='name'
//               value={formData.name}
//               onChange={onInputChange} 
//             />
//             <Form.Text className="text-muted">Nombre Completo</Form.Text>
//           </Form.Group>

//           <Form.Group className="mb-3 col-3">
//             <Form.Label>Teléfono</Form.Label>
//             <Form.Control
//               type='text'
//               placeholder='11 #### ####'
//               name='phone'
//               value={formData.phone}
//               onChange={onInputChange}  
//             />
//             <Form.Text className="text-muted">Celular o personal</Form.Text>
//           </Form.Group>
//         </Row>

//         <Row className='justify-content-center'>
//           <Form.Group className="mb-3 col-5">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               required
//               placeholder='xx@xxx.xx'
//               onChange={onInputChange} 
//             />
//             <Form.Text className="text-muted">Validar Email</Form.Text>
//           </Form.Group>
//         </Row>

//         <Button type='submit'>Crear Orden</Button>
//       </Form>
      
//     </div>
//   );
// };

// export default CheckoutForm;

import { useState } from 'react';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm'

const Checkout = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirm = (userData) => {
        console.log('Datos de usuario:', userData);
        
    };

    return (
        <div>
            <h2>Formulario de Checkout</h2>
            <CheckoutForm
                onConfirm={handleConfirm}
                formData={formData}
                onInputChange={handleInputChange}
            />
        </div>
    );
};

export default Checkout;

