import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemDetail from "../ItemDetail/ItemDetail"

function ItemDetailContainer(){
    const [productDetail, setProductDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const {itemId} = useParams()
    console.log(itemId)

    useEffect(()=>{
        axios.get(`http://localhost:3000/productos/${itemId}`)
        .then((response) => {
            setProductDetail(response.data)
            setLoading(false)
        })
        .catch((error) => {
            console.error("Error al obtener los detalles:", error);
            setLoading(false);
          });
    },[itemId])

    if (loading) {
        return <p>Cargando detalles...</p>;
      }
      if (!productDetail) {
        return <div>
            {
                console.log(itemId)
            }
        </div>

      }
    
    return (
        <div className="d-flex justify-content-center ">
          <ItemDetail
             id={productDetail.producto_id}
              category={productDetail.categoria_id}
              title={productDetail.nombre}
              description={productDetail.descripcion}
              price={productDetail.precio_venta}
              img={productDetail.imagen}
              stock={productDetail.stock}
             />
    
        </div>
    );
}

export default ItemDetailContainer

// import { useState,useEffect } from "react";
// import  ItemDetail  from "../ItemDetail/ItemDetail";
// import { getProductById } from "../../asyncMock";
// import { useParams } from 'react-router-dom'
// import { getDoc, doc } from 'firebase/firestore'
// import { db } from '../service/firebaseConfig'

// const ItemDetailContainer=()=>{
//     const [product, setProduct] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const {itemId}=useParams()

//          useEffect(() => {
//             setLoading(true)
    
//             const docRef = doc(db, 'items', itemId)
    
//             getDoc(docRef)
//                 .then(response => {
//                     const data = response.data()
//                     const productsAdapted = { id: response.id, ...data }
//                     setProduct(productsAdapted)
//                 })
//                 .catch(error => {
//                     console.log(error)
//                 })
//                 .finally(() => {
//                     setLoading(false)
//                 })
//         }, [itemId])


//     return(
//         <div className="ItemDetailContainer">
//             {loading ? <p>Cargando información del producto...</p> : <ItemDetail {...product} />}
//         </div>
//     )
    
// } 

// export default ItemDetailContainer;

/* 
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { getProductById } from "../../asyncMock";
import { useParams } from 'react-router-dom';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);

        getProductById(itemId)
            .then(response => {
                setProduct(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [itemId]);

    return (
        <div className="ItemDetailContainer">
            {loading ? <p>Cargando información del producto...</p> : <ItemDetail {...product} />}
        </div>
    );
};

export default ItemDetailContainer;*/
