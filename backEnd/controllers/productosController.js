const conexion = require("../db/conection");
function createProducto(req, res) {
  console.log(req.body);
  const {
    nombre,
    precio_venta,
    precio_compra,
    descripcion,
    imagen,
    categoria_id,
    stock,
    proveedor_id,
  } = req.body;

  if (!proveedor_id) {
    return res
      .status(400)
      .json({ error: "El campo proveedor_id es obligatorio" });
  }

  const query =
    "INSERT INTO producto (nombre, precio_venta, precio_compra, descripcion, imagen, categoria_id, stock, proveedor_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  conexion.query(
    query,
    [
      nombre,
      precio_venta,
      precio_compra,
      descripcion,
      imagen,
      categoria_id,
      stock,
      proveedor_id,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error al crear el producto");
      } else {
        return res.status(201).json(result);
      }
    }
  );
}

function getProducto(req, res) {
  const query = "SELECT * FROM producto";

  conexion.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener los productos" });
    } else {
      return res.status(200).json(results);
    }
  });
}

function getProductoId(req, res) {
  const { id } = req.params;
  const query = "SELECT * FROM producto WHERE producto_id = ?";

  conexion.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener el producto" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(results[0]);
  });
}

function deleteProducto(req, res) {
  const { id } = req.params;

  const updateQuery =
    "UPDATE compras SET producto_id = NULL WHERE producto_id = ?";

  conexion.query(updateQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Error al actualizar las compras relacionadas" });
    }

    const deleteQuery = "DELETE FROM producto WHERE producto_id = ?";

    conexion.query(deleteQuery, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al eliminar el producto" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      return res
        .status(200)
        .json({
          message: "Producto eliminado con éxito, referencias actualizadas",
        });
    });
  });
}

function updateProducto(req, res) {
  const { id } = req.params;
  const {
    nombre,
    precio_venta,
    precio_compra,
    descripcion,
    imagen,
    categoria,
    stock,
  } = req.body;

  const query =
    "UPDATE producto SET nombre = ?, precio_venta = ?, precio_compra = ?, descripcion = ?, imagen = ?, categoria_id = ?, stock = ? WHERE producto_id = ?";

  conexion.query(
    query,
    [
      nombre,
      precio_venta,
      precio_compra,
      descripcion,
      imagen,
      categoria,
      stock,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Error al actualizar el producto" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Producto actualizado con éxito" });
    }
  );
}

module.exports = {
  createProducto,
  getProducto,
  getProductoId,
  deleteProducto,
  updateProducto,
};
