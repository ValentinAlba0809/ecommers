const conexion = require("../db/conection");

function getProveedor(req, res) {
    const query = `
        SELECT 
            p.proveedor_id, 
            p.nombre, 
            p.telefono, 
            p.correo, 
            p.categoria_id, 
            c.nombre_categoria AS categoria_nombre
        FROM 
            proveedor p
        LEFT JOIN 
            categoria c 
        ON 
            p.categoria_id = c.categoria_id
    `;

    conexion.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al buscar el proveedor");
        }
        res.json(result);
    });
}


function createProveedor(req, res) {
    const { nombre, telefono, correo, categoria } = req.body;
    const query = 'INSERT INTO proveedor (nombre, telefono, correo, categoria_id) VALUES (?, ?, ?, ?)';

    conexion.query(query, [nombre, telefono, correo, categoria], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al crear el proveedor");
        }else{
            
        
        const nuevoProveedor = { id: result.insertId, nombre, telefono, correo, categoria };
        return res.status(201).json(nuevoProveedor); 
        }
    });
}

function updateProveedor(req, res) {
    const proveedoresId = req.params.id;
    const { nombre, telefono, correo, categoria } = req.body;
    const query = "UPDATE proveedor SET nombre = ?, telefono = ?, correo = ?, categoria_id = ? WHERE proveedor_id = ?";
    console.log("proveedor, update", proveedoresId);

    conexion.query(query, [nombre, telefono, correo, categoria, proveedoresId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al actualizar el proveedor");
        }
        if (result.affectedRows === 0) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.json({ message: "Proveedor actualizado correctamente" });
    });
}

function getProveedorId(req, res) {
    const proveedoresId = req.params.id;
    const query = "SELECT * FROM proveedor WHERE proveedor_id = ?";

    conexion.query(query, [proveedoresId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al buscar el proveedor");
        }
        if (result.length === 0) {
            return res.status(404).send("Proveedor no encontrado");
        }
        res.json(result[0]); 
    });
}
const deleteProveedor = (req, res) => {
    const proveedorId = req.params.id;
  
    console.log("ID recibido:", proveedorId); 
  
    if (!proveedorId) {
      return res.status(400).json({ error: 'ID no proporcionado' });
    }
  
    
    const updateComprasQuery = 'UPDATE compras SET proveedor_id = NULL WHERE proveedor_id = ?';
    conexion.query(updateComprasQuery, [proveedorId], (err) => {
        if (err) {
            console.error('Error al actualizar las compras:', err);
            return res.status(500).json({ error: 'Error al actualizar las compras asociadas' });
        }

        
        const deleteProveedorQuery = 'DELETE FROM proveedor WHERE proveedor_id = ?';
        conexion.query(deleteProveedorQuery, [proveedorId], (err, results) => {
            if (err) {
                console.error('Error al eliminar el proveedor:', err);
                return res.status(500).json({ error: 'Error al eliminar el proveedor' });
            }
      
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }
  
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        });
    });
};

  

module.exports = {
    getProveedor,
    createProveedor,
    updateProveedor,
    getProveedorId,
    deleteProveedor,
};

// const conexion = require("../db/conection");

// // Obtener todos los proveedores
// const getProveedor = (req, res) => {
//   conexion.query('SELECT * FROM proveedor', (err, results) => {
//     if (err) {
//       console.error('Error al obtener los proveedores:', err);
//       return res.status(500).json({ error: 'Error al obtener los proveedores' });
//     }

//     res.status(200).json(results);
//   });
// };

// // Crear un proveedor
// const createProveedor = (req, res) => {
//   const { nombre, telefono, correo } = req.body; // Asegúrate de que los datos lleguen correctamente en el cuerpo de la solicitud
  
//   if (!nombre || !telefono || !correo) {
//     return res.status(400).json({ error: 'Faltan datos para crear el proveedor' });
//   }

//   const query = 'INSERT INTO proveedor (nombre, telefono, correo) VALUES (?, ?, ?)';
//   const values = [nombre, telefono, correo];

//   conexion.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error al crear el proveedor:', err);
//       return res.status(500).json({ error: 'Error al crear el proveedor' });
//     }

//     res.status(201).json({ id: results.insertId, nombre, telefono, correo });
//   });
// };

// // Obtener un proveedor por ID
// const getProveedorId = (req, res) => {
//   const proveedorId = req.params.id;

//   if (!proveedorId) {
//     return res.status(400).json({ error: 'ID no proporcionado' });
//   }

//   conexion.query('SELECT * FROM proveedor WHERE proveedor_id = ?', [proveedorId], (err, results) => {
//     if (err) {
//       console.error('Error al obtener el proveedor:', err);
//       return res.status(500).json({ error: 'Error al obtener el proveedor' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Proveedor no encontrado' });
//     }

//     res.status(200).json(results[0]);
//   });
// };

// // Actualizar un proveedor (ya lo tienes como `handleUpdateSupplier` en tu frontend)
// const updateProveedor = (req, res) => {
//   const proveedorId = req.params.id;
//   const { nombre, telefono, correo } = req.body;

//   if (!nombre || !telefono || !correo) {
//     return res.status(400).json({ error: 'Faltan datos para actualizar el proveedor' });
//   }

//   const query = 'UPDATE proveedor SET nombre = ?, telefono = ?, correo = ? WHERE proveedor_id = ?';
//   const values = [nombre, telefono, correo, proveedorId];

//   conexion.query(query, values, (err, results) => {
//     if (err) {
//       console.error('Error al actualizar el proveedor:', err);
//       return res.status(500).json({ error: 'Error al actualizar el proveedor' });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: 'Proveedor no encontrado' });
//     }

//     res.status(200).json({ message: 'Proveedor actualizado correctamente' });
//   });
// };

// const deleteProveedor = (req, res) => {
   
//         const proveedorId = req.params.id;
      
//         console.log("ID recibido:", proveedorId); 
      
//         if (!proveedorId) {
//           return res.status(400).json({ error: 'ID no proporcionado' });
//         }
      
       
//         conexion.query(
//           'DELETE FROM proveedor WHERE proveedor_id = ?',
//           [proveedorId], 
//           (err, results) => {
//             if (err) {
//               console.error('Error al eliminar el proveedor:', err);
//               return res.status(500).json({ error: 'Error al eliminar el proveedor' });
//             }
      
           
//             if (results.affectedRows === 0) {
//               return res.status(404).json({ error: 'Proveedor no encontrado' });
//             }
      
//             res.status(200).json({ message: 'Proveedor eliminado correctamente' });
//           }
//         );
//       };

// module.exports = {
//   getProveedor,
//   createProveedor,
//   getProveedorId,
//   updateProveedor,
//   deleteProveedor,  // Asegúrate de exportar también el deleteProveedor
// };
