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
  const query =
    "INSERT INTO proveedor (nombre, telefono, correo, categoria_id) VALUES (?, ?, ?, ?)";

  conexion.query(
    query,
    [nombre, telefono, correo, categoria],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al crear el proveedor");
      } else {
        const nuevoProveedor = {
          id: result.insertId,
          nombre,
          telefono,
          correo,
          categoria,
        };
        return res.status(201).json(nuevoProveedor);
      }
    }
  );
}

function updateProveedor(req, res) {
  const proveedoresId = req.params.id;
  const { nombre, telefono, correo, categoria } = req.body;
  const query =
    "UPDATE proveedor SET nombre = ?, telefono = ?, correo = ?, categoria_id = ? WHERE proveedor_id = ?";
  console.log("proveedor, update", proveedoresId);

  conexion.query(
    query,
    [nombre, telefono, correo, categoria, proveedoresId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al actualizar el proveedor");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Proveedor no encontrado");
      }
      res.json({ message: "Proveedor actualizado correctamente" });
    }
  );
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
    return res.status(400).json({ error: "ID no proporcionado" });
  }

  const updateComprasQuery =
    "UPDATE compras SET proveedor_id = NULL WHERE proveedor_id = ?";
  conexion.query(updateComprasQuery, [proveedorId], (err) => {
    if (err) {
      console.error("Error al actualizar las compras:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar las compras asociadas" });
    }

    const deleteProveedorQuery = "DELETE FROM proveedor WHERE proveedor_id = ?";
    conexion.query(deleteProveedorQuery, [proveedorId], (err, results) => {
      if (err) {
        console.error("Error al eliminar el proveedor:", err);
        return res
          .status(500)
          .json({ error: "Error al eliminar el proveedor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }

      res.status(200).json({ message: "Proveedor eliminado correctamente" });
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
