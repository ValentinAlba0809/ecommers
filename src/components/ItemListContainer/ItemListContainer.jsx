/* import React, { useEffect, useState } from 'react';
import {ItemList} from "../ItemList/ItemList";
import { useParams } from 'react-router-dom'
import {getDocs, collection, query, where} from 'firebase/firestore'
import {db} from '../service/firebaseConfig'


  const ItemListContainer = ({greeting},)=> {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {
      setLoading(true)

      const collectionRef = categoryId
          ? query(collection(db, 'items'), where('category', '==', categoryId))
          : collection(db, 'items')

      getDocs(collectionRef)
          .then(response => {
              const productsAdapted = response.docs.map(doc => {
                  const data = doc.data()
                  return { id: doc.id, ...data }
              })
              setProducts(productsAdapted)
          })
          .catch(error => {
              console.log(error)
          })
          .finally(() => {
              setLoading(false)
          })
  }, [categoryId])
      return (

          <div className=' fw-bolder'>
            <h1 className=' rounded-5 text-uppercase bd-blue-600  '>{greeting}</h1>
                <div className='text-dark-emphasis fw-bolder' >{loading ? (<div>...loading</div>) : (
                <ItemList products={products} />
            )}</div></div>

      )
}
export default ItemListContainer;  */

/*******************************************************************************/
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { CardFooter } from 'react-bootstrap';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

// const ItemListContainer = () => {
//     const [productos, setProductos] = useState([]);

//     useEffect(() => {
//         const fetchProductos = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/productos');
//                 setProductos(response.data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProductos();
//     }, []);

//     return (
//         <div className='d-flex flex-wrap justify-content-center'>
//             <h2>pito</h2>
//             {productos.map((producto) => (
//                 <Card className=' m-5 d-flex ' style={{ width: '18rem' }} key={producto.id}>
//                     <Card.Img variant="top" src={producto.imagen} />
//                     <Card.Body>
//                         <Card.Title>{producto.nombre}</Card.Title>
//                         <Card.Text> {producto.descripcion} </Card.Text>
//                         <Card.Text> categoria: {producto.categoria} </Card.Text>
//                         <Link to={`/item/${producto.id}`}>
//                             <Button variant="primary" >
//                                 Ver Producto
//                             </Button>
//                         </Link>
//                         <CardFooter variant="primary">{producto.precio_venta}</CardFooter>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default ItemListContainer;
/***************************************************************************************************************/





/* 
import React, { useEffect, useState } from 'react';
import { ItemList } from "../ItemList/ItemList";
import { useParams } from 'react-router-dom';
import { getProduct, getProductsByCategory } from '../../asyncMock'; 

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const fetchProducts = categoryId ? getProductsByCategory(categoryId) : getProduct();

        fetchProducts
            .then(response => {
                setProducts(response);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div className='fw-bolder'>
            <h1 className='rounded-5 text-uppercase bd-blue-600'>{greeting}</h1>
            <div className='text-dark-emphasis fw-bolder'>
                {loading ? <div>...loading</div> : <ItemList products={products} />}
            </div>
        </div>
    );
}

export default ItemListContainer;*/
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardFooter } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const { categoryId } = useParams(); 
    
   
    const categorias = {
        celular: 1,
        tablet: 2,
        netbook: 3
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
                const allProducts = response.data;

              
                const categoriaIdNumerico = categorias[categoryId];

                const filteredProducts = categoriaIdNumerico 
                    ? allProducts.filter((producto) => producto.categoria_id === categoriaIdNumerico)
                    : allProducts;

                setProductos(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProductos();
    }, [categoryId]);

    return (
        <div className='d-flex flex-wrap justify-content-center'>
            {productos.length > 0 ? (
                productos.map((producto) => (
                    <Card className='m-5 d-flex' style={{ width: '18rem' }} key={producto.producto_id}>
                        <Card.Img variant="top" src={producto.imagen} />
                        <Card.Body>
                            <Card.Title>{producto.nombre}</Card.Title>
                            <Card.Text className='text-truncate'>{producto.descripcion}</Card.Text>
                            {/* <Card.Text>Categoria: {producto.categoria}</Card.Text> */}
                            <Link to={`/item/${producto.producto_id}`}>
                                <Button variant="primary">
                                    Ver Producto
                                </Button>
                            </Link>
                            <CardFooter className='text-success' variant="primary">Precio: ${producto.precio_venta}</CardFooter>
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



{/* <Link to={`/item/${producto.id}`}>
<Button variant="primary">
    Ver Producto
</Button>
</Link> */}





// <div className="card shadow" style={{ width: '20rem', margin: '.5rem' }}>
//                         <img src={producto.imagen} className="card-img-top shadow rounded-2 object-fit-fill p-3" />
//                         <div className="card-body">
//                             <p className=" text-uppercase card-title">{producto.nombre}</p>
//                             <Accordion defaultActiveKey="0">
//                                 <Accordion.Item eventKey="1">
//                                     <Accordion.Header>
//                                         Mostrar Descripcion
//                                     </Accordion.Header>
//                                     <Accordion.Body>
//                                         {producto.descripcion}
//                                     </Accordion.Body>
//                                 </Accordion.Item>
//                             </Accordion>
//                             <div className="collapse" id="collapseExample">
//                                 <div className="card card-body">
//                                     <p className=" text-body-secondary">
//                                         {producto.descripcion}
//                                     </p>
//                                 </div>
                                
//                             </div>

//                         </div>
                       
//                     </div>