import { useState } from "react";
import './ItemCount.css';
import 'bootstrap';
import { useAuth } from "../context/AuthContext"; 

const ItemCount = ({ stockDisponible, initial, onAdd }) => {
  const { user } = useAuth(); 
  const [counter, setCounter] = useState(initial);

  const handlerDecreaseCount = () => {
    if (counter > 0) setCounter(counter - 1);
  };

  const handlerIncreaseCount = () => {
    if (stockDisponible > counter) setCounter(counter + 1);
  };

  return (
    <div className="p-2">
      <div className="Button btn-group mb-2" role="group">
        <button className="Button btn btn-outline-primary" onClick={handlerDecreaseCount}>-</button>
        <h4 className="Number">{counter}</h4>
        <button className="Button btn btn-outline-primary" type="submit" onClick={handlerIncreaseCount}>+</button>
      </div>
      <div>

        {user ? (
          <button className="btn btn-primary" onClick={() => onAdd(counter)} disabled={!stockDisponible}>
            Agregar al carrito
          </button>
        ) : (
          <div className="alert alert-warning" role="alert">
            Necesitas <a href="/auth/login" className="alert-link">loguearte</a> para agregar al carrito.
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCount;
