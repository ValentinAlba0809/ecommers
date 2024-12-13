const conexion = require("../db/conection");

function getVentas(req, res) {
    const query = `
       SELECT 
    ventas.venta_id AS id_venta, 
    ventas.fecha_venta, 
    ventas.total, 
    ventas.cliente_id,  
    venta_detalle.producto_id, 
    producto.nombre AS nombre_producto 
FROM ventas
LEFT JOIN venta_detalle ON ventas.venta_id = venta_detalle.venta_id
LEFT JOIN producto ON venta_detalle.producto_id = producto.producto_id;

    `;

    conexion.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los clientes' });
        } else {
            return res.status(200).json(results);
        }
    });
}

module.exports = {

    getVentas

};