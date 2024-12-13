import axios from "axios";
import { useEffect, useState } from "react";
import { CardFooter } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { categoryId } = useParams();

  const categorias = {
    celular: 1,
    tablet: 2,
    netbook: 3,
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/productos");
        const allProducts = response.data;

        const categoriaIdNumerico = categorias[categoryId];

        const filteredProducts = categoriaIdNumerico
          ? allProducts.filter(
              (producto) => producto.categoria_id === categoriaIdNumerico
            )
          : allProducts;

        setProductos(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductos();
  }, [categoryId]);

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {productos.length > 0 ? (
        productos.map((producto) => (
          <Card
            className="m-5 d-flex"
            style={{ width: "18rem" }}
            key={producto.producto_id}
          >
            <Card.Img variant="top" src={producto.imagen} />
            <Card.Body>
              <Card.Title>{producto.nombre}</Card.Title>
              <Card.Text className="text-truncate">
                {producto.descripcion}
              </Card.Text>
              <Card.Text>Categoria: {producto.categoria}</Card.Text>
              <Link to={`/item/${producto.producto_id}`}>
                <Button variant="primary">Ver Producto</Button>
              </Link>
              <CardFooter className="text-success" variant="primary">
                Precio: ${producto.precio_venta}
              </CardFooter>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;
