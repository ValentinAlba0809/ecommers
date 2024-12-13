import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: []
})

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0); 
    const [total, setTotal] = useState(0);
    console.log(cart);

    const addItem = (item, quantity) => {
        console.log("Item recibido:", item); // Verifica los datos del producto
        console.log("ID del producto:", item.id);
        console.log("cantidad",quantity)
    
        if (!item.id) {
            console.error("El producto no tiene un ID válido:", item);
            return;
        }
    
        if (isInCart(item.id)) {
            setCart(prev =>
                prev.map(prod =>
                    prod.id === item.id
                        ? { ...prod, quantity: prod.quantity + quantity }
                        : prod
                )
            );
            console.log("El producto ya fue agregado");
        } else {
            setCart(prev => [...prev, { ...item, quantity }]);
            console.log("Producto agregado al carrito:", { ...item, quantity });
        }
    
        setTotalQuantity(prev => prev + quantity);
        setTotal(prev => prev + item.price * quantity);
    };
    

    

    const removeItem = (itemId) => {
        const cartUpdated = cart.find(item => item.id === itemId);
        setCart(prev => prev.filter(item => item.id !== itemId));
        setTotalQuantity(prev => prev - cartUpdated.quantity);
        setTotal(prev => prev - cartUpdated.price * cartUpdated.quantity);
    };

    const clearCart = () => {
        setCart([]);
        setTotalQuantity(0);
        setTotal(0);
    };

    const isInCart = (itemId) => {
        // return cart.some(prod => prod.id === itemId);
        const exists = cart.some(prod => prod.id === itemId);
    console.log(`¿Está el producto ${itemId} en el carrito?:`, exists);
    return exists;
    };

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, totalQuantity, total }}>
            {children}
        </CartContext.Provider>
    );
};
