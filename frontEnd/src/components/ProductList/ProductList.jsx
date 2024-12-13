import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "../Item/Item";
import ProductFormModal from "../ProductForm/ProductForm";
import Button from "react-bootstrap/Button";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [proveedores, setProveedores] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/proveedores");
      setProveedores(response.data);
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
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
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.producto_id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      setError("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (id) => {
    const productToEdit = products.find(
      (product) => product.producto_id === id
    );
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
          product.producto_id === id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setError("Error al actualizar el producto");
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
      await axios.post("http://localhost:3000/productos", newProduct);
      await fetchProducts();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setError("Error al agregar el producto");
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
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex flex-wrap justify-content-around">
        {products.map((product) => (
          <Item
            key={product.producto_id}
            id={product.producto_id}
            title={product.nombre}
            img={product.imagen}
            price={product.precio_venta}
            purchasePrice={product.precio_compra}
            description={product.descripcion}
            category={product.categoria}
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
      />
    </div>
  );
};

export default ProductList;
