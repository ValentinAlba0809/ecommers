import ItemCount from "../ItemCount/ItemCount"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import  {CartContext}  from "../../context/cartContext"
import CheckoutForm from "../CheckoutForm/CheckoutForm"




const ItemDetail =({id,category,title,description,price,img,stock}) => {
    const [quantityAdded,setQuantityAdded] =useState(false)
    const {addItem}=useContext(CartContext)

     const handleOnAdd=(quantity) => {
        setQuantityAdded(true)

    const product={id,title, price,img}
    
        addItem(product,quantity)
    }

    return(
        
    <div className="card shadow-lg" style={{ width: 1170, margin: "30px auto" }}>
        <h1 className="text-uppercase p-2">
            {title} 
           
        </h1>
       
        <picture>
            <img className="shadow p-3 rounded-2" src={img} alt={description}/>
        </picture>
        <section className="p-3">
            <p>{description}</p>
            <p className=" fst-italic fw-bolder">Stock Disponible {stock}</p>
            <p> ${price}</p>
            <p>pid {category}</p>
            {console.log(category)}
        </section>
        <footer className=" card-footer">
            {
            quantityAdded >0? (
                <Link to={'/cart'} className='btn btn-outline-warning'>Terminar Compra</Link>
            ):(
            <ItemCount initial={1} stockDisponible={stock} onAdd={handleOnAdd}/>)
            }
            <Link to="/" className="btn btn-primary">Seguir comprando</Link>
        </footer>
    </div>
    )   
} 

export  default ItemDetail