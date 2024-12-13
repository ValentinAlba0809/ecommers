const conexion = require("../db/conection");

function getCompras(req, res) {
    const query = `
    SELECT 
            compras.compra_id, 
            compras.cantidad, 
            compras.precio, 
            compras.fecha_compra, 
            producto.nombre AS producto_nombre, 
            categoria.nombre_categoria AS categoria_nombre, 
            proveedor.nombre AS proveedor_nombre
        FROM compras
        JOIN producto ON compras.producto_id = producto.producto_id
        JOIN categoria ON producto.categoria_id = categoria.categoria_id
        JOIN proveedor ON compras.proveedor_id = proveedor.proveedor_id
`;

    conexion.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al buscar el proveedor");
        }
        res.json(result);
    });
}
module.exports = {
    getCompras
   
};
