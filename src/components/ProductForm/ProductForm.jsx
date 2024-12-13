// import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

// const ProductFormModal = ({ product, show, handleClose, onSave, proveedores }) => {
//   const [formData, setFormData] = useState({
//     nombre: '',
//     precio_venta: '',
//     precio_compra: '',
//     descripcion: '',
//     imagen: '',
//     categoria_id: '',
//     stock: '',
//     proveedor_id: ''
//   });

//   const [filteredProveedores, setFilteredProveedores] = useState([]); // Estado para proveedores filtrados

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         nombre: product.nombre,
//         precio_venta: product.precio_venta,
//         precio_compra: product.precio_compra,
//         descripcion: product.descripcion,
//         imagen: product.imagen,
//         categoria_id: product.categoria_id,
//         stock: product.stock,
//         proveedor_id: product.proveedor_id || ''
//       });
//     }
//   }, [product]);

//   useEffect(() => {
//     if (formData.categoria_id) {
//       const filtered = proveedores.filter(
//         (proveedor) => String(proveedor.categoria_id) === String(formData.categoria_id)
//       );
//       setFilteredProveedores(filtered);
//     } else {
//       setFilteredProveedores([]);
//     }
//   }, [formData.categoria_id, proveedores]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData); // Llama a la función para guardar los cambios
//     console.log("kkk",typeof formData)
//     handleClose(); // Cierra el modal
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{product ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formProductName">
//             <Form.Label>Nombre</Form.Label>
//             <Form.Control
//               type="text"
//               name="nombre"
//               value={formData.nombre}
//               onChange={handleChange}
//               placeholder="Ingrese el nombre del producto"
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductPrice">
//             <Form.Label>Precio de Venta</Form.Label>
//             <Form.Control
//               type="number"
//               name="precio_venta"
//               value={formData.precio_venta}
//               onChange={handleChange}
//               placeholder="Ingrese el precio de venta"
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductPurchasePrice">
//             <Form.Label>Precio de Compra</Form.Label>
//             <Form.Control
//               type="number"
//               name="precio_compra"
//               value={formData.precio_compra}
//               onChange={handleChange}
//               placeholder="Ingrese el precio de compra"
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductDescription">
//             <Form.Label>Descripción</Form.Label>
//             <Form.Control
//               as="textarea"
//               name="descripcion"
//               value={formData.descripcion}
//               onChange={handleChange}
//               placeholder="Ingrese la descripción del producto"
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductImg">
//             <Form.Label>URL de la Imagen</Form.Label>
//             <Form.Control
//               type="text"
//               name="imagen"
//               value={formData.imagen}
//               onChange={handleChange}
//               placeholder="Ingrese la URL de la imagen del producto"
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductCategory">
//             <Form.Label>Categoría</Form.Label>
//             <Form.Select
//               name="categoria_id"
//               value={formData.categoria_id}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Seleccione una categoría</option>
//               <option value="3">Notebook</option>
//               <option value="1">Celular</option>
//               <option value="2">Tablet</option>
//             </Form.Select>
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formProductStock">
//             <Form.Label>Stock</Form.Label>
//             <Form.Control
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               placeholder="Ingrese la cantidad de stock"
//               required
//             />
//           </Form.Group>

//           {/* Campo para seleccionar proveedor */}
//           <Form.Group className="mb-3" controlId="formProductProvider">
//   <Form.Label>Proveedor</Form.Label>
//   <Form.Select
//     name="proveedor_id"
//     value={formData.proveedor_id}
//     onChange={handleChange}
//     required={filteredProveedores.length > 0}
//   >
//     <option value="">Seleccione un proveedor</option>
//     {filteredProveedores.length > 0 ? (
//       filteredProveedores.map((proveedor) => (
//         <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
//           {proveedor.nombre}
//         </option>
//       ))
//     ) : (
//       formData.categoria_id && (
//         <option value="">No hay proveedores disponibles para esta categoría</option>
//       )
//     )}
//   </Form.Select>
// </Form.Group>


//           <Button variant="primary" type="submit">
//             Guardar Cambios
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ProductFormModal;

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ProductFormModal = ({ product, show, handleClose, onSave, proveedores }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio_venta: '',
    precio_compra: '',
    descripcion: '',
    imagen: '',
    categoria_id: '',
    stock: '',
    proveedor_id: ''
  });

  const [filteredProveedores, setFilteredProveedores] = useState([]); 

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio_venta: product.precio_venta,
        precio_compra: product.precio_compra,
        descripcion: product.descripcion,
        imagen: product.imagen,
        categoria_id: product.categoria_id,
        stock: product.stock,
        proveedor_id: product.proveedor_id || ''
      });
    }
  }, [product]);

  useEffect(() => {
    console.log("formd ata", formData, typeof formData)
    if (formData.categoria_id) {
      
      const categoriaId = parseInt(formData.categoria_id, 10);
      const filtered = proveedores.filter(
        (proveedor) => proveedor.categoria_id === categoriaId
      );


      console.log("Proveedores filtrados:", filtered, typeof filtered);
      setFilteredProveedores(filtered);
      console.log("Proveedores recibidos:", proveedores);
      console.log("Categoría seleccionada:", formData.categoria_id);
    } else {
      setFilteredProveedores([]);
    }
  }, [formData.categoria_id, proveedores]);




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      onSave(product.producto_id, formData); 
    } else {
      onSave(formData); 
    }
    handleClose();
  };



  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formProductName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingrese el nombre del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductPrice">
            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              type="number"
              name="precio_venta"
              value={formData.precio_venta}
              onChange={handleChange}
              placeholder="Ingrese el precio de venta"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductPurchasePrice">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              name="precio_compra"
              value={formData.precio_compra}
              onChange={handleChange}
              placeholder="Ingrese el precio de compra"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ingrese la descripción del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductImg">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="Ingrese la URL de la imagen del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="categoria_id"
              value={formData.categoria_id}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              <option value="3">Notebook</option>
              <option value="1">Celular</option>
              <option value="2">Tablet</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProductStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ingrese la cantidad de stock"
              required
            />
          </Form.Group>

          {/* Campo para seleccionar proveedor */}
          <Form.Group className="mb-3" controlId="formProductProvider">
            <Form.Label>Proveedor</Form.Label>
            <Form.Select
              name="proveedor_id"
              value={formData.proveedor_id}
              onChange={handleChange}
              // Deshabilitar si no hay categoría seleccionada
              required={formData.categoria_id}
            >
              <option value="">Seleccione un proveedor</option>
              {filteredProveedores.length > 0 ? (
                filteredProveedores.map((proveedor) => (
                  <option key={proveedor.proveedor_id} value={proveedor.proveedor_id}>
                    {proveedor.nombre}
                  </option>
                ))
              ) : (
                <option value="">No hay proveedores disponibles para esta categoría</option>
              )}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductFormModal;


