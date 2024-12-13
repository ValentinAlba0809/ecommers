// const conexion = require("../db/conection");

// function getProducto(req, res) {
//     const query = "SELECT * FROM productos"

//     conexion.query(query, (err, result) => {
//         if (err) {
//             console.error(err)
//             res.status(500).send("Error al buscar el producto")
//         } else {
//             res.json(result)
//         }
//     })
// }

// function createProducto(req, res) {
//     console.log(req.body)
//     const { imagen, categoria, descripcion, precio_compra, precio_venta, nombre, stock } = req.body
//     const query = 'INSERT INTO productos (imagen, categoria, descripcion, precio_compra, precio_venta, nombre, stock) VALUES (?, ?, ?, ?, ?, ?, ?)'

//     conexion.query(query, [imagen, categoria, descripcion, precio_compra, precio_venta, nombre, stock], (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.status(500).send("Error al crear el producto")
//         } else {
//             return res.status(200).json(result)
//         }
//     })

// }

// function updateProducto(req, res) {
//     const productosId = req.params.id;  // Asegúrate de que este ID sea el que esperas
//     const { imagen, categoria, descripcion, precio_compra, precio_venta, nombre, stock } = req.body;
    
//     // Verifica si el ID es válido y si existe en la base de datos (opcional)
//     if (!productosId) {
//         return res.status(400).send("ID del producto no proporcionado");
//     }

//     const query = `
//         UPDATE productos 
//         SET imagen = ?, categoria = ?, descripcion = ?, precio_compra = ?, precio_venta = ?, nombre = ?, stock = ? 
//         WHERE id = ?
//     `;

//     conexion.query(query, [imagen, categoria, descripcion, precio_compra, precio_venta, nombre, stock, productosId], (err, result) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send("Error al actualizar el producto");
//         } else if (result.affectedRows === 0) {
//             res.status(404).send("Producto no encontrado");
//         } else {
//             res.status(200).json({ message: "Producto actualizado con éxito", result });
//         }
//     });
// }


// function getProductoId(req, res) {
//     const productosId = req.params.id
//     const query = "SELECT * FROM productos where id = ?"

//     conexion.query(query, [productosId], (err, result) => {
//         if (err) {
//             console.error(err)
//             res.status(500).send("Error al buscar el producto")
//         } else {
//             res.json(result)
//         }
//     })
// }

// function deleteProducto(req, res) {
//     const productosId = req.params.id
//     const query = "DELETE FROM productos where id = ?"

//     conexion.query(query, [productosId], (err, result) => {
//         if (err) {
//             console.error(err)
//             res.status(500).send("Error al borrar el producto")
//         } else {
//             res.json(result)
//         }
//     })
// }

// module.exports = {
//     getProducto,
//     createProducto,
//     updateProducto,
//     getProductoId,
//     deleteProducto
// };



// function createProducto(req, res) {
//     console.log(req.body); 
//     const { nombre, precio_venta, descripcion, imagen } = req.body; // Ahora incluimos la imagen

//     const query = 'INSERT INTO productos (nombre, precio_venta, descripcion, imagen) VALUES (?, ?, ?, ?)';

//     conexion.query(query, [nombre, precio_venta, descripcion, imagen], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error al crear el producto"); 
//         } else {
//             return res.status(201).json(result); // 201 indica que se ha creado un nuevo recurso
//         }
//     });
// }

// function createProducto(req, res) { 
//     console.log(req.body); 
//     const { nombre, precio_venta, descripcion, imagen, categoria } = req.body; // Incluimos la categoría

//     const query = 'INSERT INTO productos (nombre, precio_venta, descripcion, imagen, categoria) VALUES (?, ?, ?, ?, ?)';

//     conexion.query(query, [nombre, precio_venta, descripcion, imagen, categoria], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error al crear el producto"); 
//         } else {
//             // Obtener el ID del producto recién creado y devolverlo en la respuesta
//             const nuevoProducto = { id: result.insertId, nombre, precio_venta, descripcion, imagen, categoria };
//             return res.status(201).json(nuevoProducto); // Devolver el producto creado con su categoría
//         }
//     });
// }
// function createProducto(req, res) { 
//     console.log(req.body); 
//     const { nombre, precio_venta, precio_compra, descripcion, imagen, categoria } = req.body; // Incluimos precio_compra

//     const query = 'INSERT INTO productos (nombre, precio_venta, precio_compra, descripcion, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?)';

//     conexion.query(query, [nombre, precio_venta, precio_compra, descripcion, imagen, categoria], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send("Error al crear el producto"); 
//         } else {
//             return res.status(201).json(result); // 201 indica que se ha creado un nuevo recurso
//         }
//     });
// }

// function deleteProducto(req, res) {
//     const { id } = req.params; 
//     const query = 'DELETE FROM producto WHERE producto_id = ?';

//     conexion.query(query, [id], (err, result) => {
//         if (err) {
//             console.error(err); 
//             return res.status(500).json({ error: 'Error al eliminar el producto' }); 
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Producto no encontrado' }); 
//         }

//         return res.status(200).json({ message: 'Producto eliminado con éxito' }); 
//     });
// }
// Eliminar un producto, estableciendo a NULL las referencias en la tabla 'compras'

const conexion = require("../db/conection");
function createProducto(req, res) {
    console.log(req.body);
    const { nombre, precio_venta, precio_compra, descripcion, imagen, categoria_id, stock, proveedor_id } = req.body; 
    
   
    if (!proveedor_id) {
        return res.status(400).json({ error: 'El campo proveedor_id es obligatorio' });
    }

    const query = 'INSERT INTO producto (nombre, precio_venta, precio_compra, descripcion, imagen, categoria_id, stock, proveedor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    conexion.query(query, [nombre, precio_venta, precio_compra, descripcion, imagen, categoria_id, stock, proveedor_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al crear el producto");
        } else {
            return res.status(201).json(result); 
        }
    });
}



function getProducto(req, res) { 
    const query = 'SELECT * FROM producto'; 

    conexion.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener los productos' });
        } else {
            return res.status(200).json(results);
        }
    });
}

function getProductoId(req, res) {
    const { id } = req.params; 
    const query = 'SELECT * FROM producto WHERE producto_id = ?';

    conexion.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al obtener el producto' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        return res.status(200).json(results[0]);
    });
}

function deleteProducto(req, res) {
    const { id } = req.params;

   
    const updateQuery = 'UPDATE compras SET producto_id = NULL WHERE producto_id = ?';

    conexion.query(updateQuery, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al actualizar las compras relacionadas' });
        }

        
        const deleteQuery = 'DELETE FROM producto WHERE producto_id = ?';

        conexion.query(deleteQuery, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error al eliminar el producto' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return res.status(200).json({ message: 'Producto eliminado con éxito, referencias actualizadas' });
        });
    });
}

function updateProducto(req, res) {
    const { id } = req.params; 
    const { nombre, precio_venta, precio_compra, descripcion, imagen, categoria, stock } = req.body; 

    const query = 'UPDATE producto SET nombre = ?, precio_venta = ?, precio_compra = ?, descripcion = ?, imagen = ?, categoria_id = ?, stock = ? WHERE producto_id = ?';

    conexion.query(query, [nombre, precio_venta, precio_compra, descripcion, imagen, categoria, stock, id], (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: 'Error al actualizar el producto' }); 
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' }); 
        }

        return res.status(200).json({ message: 'Producto actualizado con éxito' }); 
    });
}


module.exports = {
    createProducto,
    getProducto,
    getProductoId,
    deleteProducto,
    updateProducto 
};
