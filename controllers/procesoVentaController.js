// const connection = require('../db/conection');

// function procesarVenta (req, res) {
//   const { productoId, cantidadComprada } = req.body; 

 
//   connection.query(
//     'SELECT stock FROM producto WHERE id = ?',
//     [productoId],
//     (err, results) => {
//       if (err) {
//         console.error('Error al consultar el producto:', err);
//         return res.status(500).json({ message: 'Error al procesar la compra' });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ message: 'Producto no encontrado' });
//       }

//       const producto = results[0];

//       // Verifica si hay suficiente stock
//       if (producto.cantidad < cantidadComprada) {
//         return res.status(400).json({ message: 'No hay suficiente stock' });
//       }

//       // Ahora resta la cantidad comprada de la base de datos
//       connection.query(
//         'UPDATE producto SET stock = stock - ? WHERE id = ?',
//         [cantidadComprada, productoId],
//         (err, results) => {
//           if (err) {
//             console.error('Error al actualizar la base de datos:', err);
//             return res.status(500).json({ message: 'Error al procesar la compra' });
//           }

//           // Si la actualización fue exitosa, devuelve una respuesta
//           res.status(200).json({ message: 'Compra realizada con éxito' });
//         }
//       );
//     }
//   );
// };

// module.exports = procesarVenta ;
