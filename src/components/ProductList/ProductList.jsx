// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Item from '../Item/Item';
// import ProductFormModal from '../ProductForm/ProductForm'; 
// import Button from 'react-bootstrap/Button';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editProduct, setEditProduct] = useState(null);
//   const [error, setError] = useState(null); 
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:3000/productos');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error al obtener los productos:', error);
//       setError('Error al obtener productos'); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); 
//   }, []);
// const [proveedores, setProveedores] = useState([]);

// const fetchProveedores = async () => {
//   setLoading(true);
//   setError(null);
//   try {
//     const response = await axios.get('http://localhost:3000/proveedores'); // Cambia la URL según corresponda
//     setProveedores(response.data);
//   } catch (error) {
//     console.error('Error al obtener proveedores:', error);
//     setError('Error al obtener proveedores');
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   fetchProducts();
//   fetchProveedores(); // Llamamos a la función que obtiene los proveedores
// }, []);

//   const handleDeleteProduct = async (id) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`http://localhost:3000/productos/${id}`);
//       setProducts((prevProducts) => prevProducts.filter((product) => product.producto_id !== id));
//     } catch (error) {
//       console.error('Error al eliminar el producto:', error);
//       setError('Error al eliminar el producto');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditProduct = (id) => {
//     const productToEdit = products.find((product) => product.producto_id === id);
//     setEditProduct(productToEdit);
//     setIsEditing(true); 
//     setShowModal(true); 
//   };

//   const handleUpdateProduct = async (id, updatedProduct) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.put(`http://localhost:3000/productos/${id}`, updatedProduct);
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product.producto_id === id ? { ...product, ...updatedProduct } : product
//         )
//       );
//     } catch (error) {
//       console.error('Error al actualizar el producto:', error);
//       setError('Error al actualizar el producto'); 
//     } finally {
//       setLoading(false);
//       setEditProduct(null);
//       setShowModal(false); 
//     }
//   };

//   const handleAddProduct = async (newProduct) => {
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.post('http://localhost:3000/productos', newProduct);
//       await fetchProducts();
//     } catch (error) {
//       console.error('Error al agregar el producto:', error);
//       setError('Error al agregar el producto');
//     } finally {
//       setLoading(false);
//       setShowModal(false); 
//     }
//   };

//   const handleAddButtonClick = () => {
//     setEditProduct(null); 
//     setIsEditing(false);
//     setShowModal(true); 
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="product-list-container">
//       <h2>Lista de Productos</h2>
//       {error && <div className="alert alert-danger">{error}</div>} 
//       <div className="d-flex flex-wrap justify-content-around">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <Item
//               key={product.producto_id} // Asegúrate de usar el campo correcto de id
//               id={product.producto_id} // Este es el id que se pasa a los manejadores
//               title={product.nombre}
//               img={product.imagen}
//               price={product.precio_venta}
//               purchasePrice={product.precio_compra}
//               description={product.descripcion}
//               category={product.categoria} 
//               stock={product.stock} 
//               showEditButton={true}
//               showDeleteButton={true}
//               onEdit={handleEditProduct}  // Asegúrate de que aquí pase el id correcto
//               onDelete={handleDeleteProduct}
//               className="product-item"
//             />
//           ))
//         ) : (
//           <p>No hay productos disponibles.</p>
//         )}
//       </div>

//       <Button variant="primary" onClick={handleAddButtonClick}>
//         Agregar Producto
//       </Button>

//       {/* Modal para editar o agregar productos */}
//       <ProductFormModal
//         product={isEditing ? editProduct : null} // Si estamos en modo de edición, pasamos el producto
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         onSave={isEditing ? (updatedProduct) => handleUpdateProduct(editProduct.producto_id, updatedProduct) : handleAddProduct}
//       />
//     </div>
//   );
// };

// export default ProductList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from '../Item/Item';
import ProductFormModal from '../ProductForm/ProductForm'; 
import Button from 'react-bootstrap/Button';
import { useAuth } from "../context/AuthContext"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [proveedores, setProveedores] = useState([]); 
  const { user } = useAuth(); 
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/productos');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setError('Error al obtener productos'); 
    } finally {
      setLoading(false);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/proveedores');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al obtener los proveedores:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
    fetchProveedores(); 
  }, []);

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.producto_id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setError('Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find((product) => product.producto_id === id);
    setEditProduct(productToEdit);
    setIsEditing(true); 
    setShowModal(true); 
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:3000/productos/${id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.producto_id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setError('Error al actualizar el producto'); 
    } finally {
      setLoading(false);
      setEditProduct(null);
      setShowModal(false); 
    }
  };

  const handleAddProduct = async (newProduct) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('http://localhost:3000/productos', newProduct);
      await fetchProducts();
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      setError('Error al agregar el producto');
    } finally {
      setLoading(false);
      setShowModal(false); 
    }
  };

  const handleAddButtonClick = () => {
    setEditProduct(null); 
    setIsEditing(false);
    setShowModal(true); 
    
  };

  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
      {user ? (<div>{error && <div className="alert alert-danger">{error}</div>} 
      <div className="d-flex flex-wrap justify-content-around">
        {products.map((product) => (
          console.log(product.categoria_id),
          <Item
          key={product.producto_id} 
          id={product.producto_id} 
          title={product.nombre}
          img={product.imagen}
          price={product.precio_venta}
          purchasePrice={product.precio_compra}
          description={product.descripcion}
          category={product.categoria_id} 
          stock={product.stock} 
          showEditButton={true}
          showDeleteButton={true}
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct}
          className="product-item"
          />

          
        ))}
      </div>
      <Button variant="primary" onClick={handleAddButtonClick}>
        Agregar Producto
      </Button>
      <ProductFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        product={editProduct}
        onSave={isEditing ? handleUpdateProduct : handleAddProduct}
        proveedores={proveedores} 
      /></div> ): ( <div className="alert alert-warning" role="alert">
        Necesitas <a href="/auth/login" className="alert-link">loguearte</a> para ver este sitio
      </div>)}
      
    </div>
  );
};

export default ProductList;
