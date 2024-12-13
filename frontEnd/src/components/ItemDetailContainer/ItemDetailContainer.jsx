import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemDetail from "../ItemDetail/ItemDetail";

function ItemDetailContainer() {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  console.log(itemId);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/productos/${itemId}`)
      .then((response) => {
        setProductDetail(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles:", error);
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p>Cargando detalles...</p>;
  }
  if (!productDetail) {
    return <div>{console.log(itemId)}</div>;
  }

  return (
    <div className="d-flex justify-content-center ">
      <ItemDetail
        id={productDetail.id}
        category={productDetail.categoria}
        title={productDetail.nombre}
        description={productDetail.descripcion}
        price={productDetail.precio_venta}
        img={productDetail.imagen}
        stock={productDetail.stock}
      />
    </div>
  );
}

export default ItemDetailContainer;
