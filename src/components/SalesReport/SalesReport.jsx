import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { Table, Form, Button, Row } from "react-bootstrap";

const SalesReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    orderNumber: "",
    startDate: "",
    endDate: "",
    clientName: ""
  });

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/ventas");
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error("Error al obtener los datos de la API:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    const chartData = filteredData.map((item) => ({
      x: item.nombre_producto,
      y: parseFloat(item.total) 
    }));

    const options = {
      chart: {
        type: "donut",
        height: 350
      },
      series: chartData.map((data) => data.y),
      labels: chartData.map((data) => data.x),
      xaxis: {
        type: "category"
      }
    };

   
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => chart.destroy();
  }, [filteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleClearFilters = () => {
    setFilters({ orderNumber: "", startDate: "", endDate: "", clientName: "" });
  };


  const filteredSales = filteredData.filter((item) => {
    const matchesOrderNumber = filters.orderNumber
      ? item.id.toString().includes(filters.orderNumber)
      : true;
    const matchesStartDate = filters.startDate
      ? new Date(item.fecha_venta) >= new Date(filters.startDate)
      : true;
    const matchesEndDate = filters.endDate
      ? new Date(item.fecha_venta) <= new Date(filters.endDate)
      : true;
    const matchesClientName = filters.clientName
      ? item.cliente_id.toString().includes(filters.clientName)
      : true;

    return matchesOrderNumber && matchesStartDate && matchesEndDate && matchesClientName;
  });

  return (
    <div className="container-fluid">
      <h1>Reporte de Ventas</h1>
      
      <Row className="justify-content-center">
        <Form className="col-12 col-md-10">
          <Row className="mb-3">
            <Form.Group className="col-md-3" controlId="orderNumber">
              <Form.Label>Orden de Venta</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por número de orden"
                name="orderNumber"
                value={filters.orderNumber}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3" controlId="startDate">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3" controlId="endDate">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="col-md-3" controlId="clientName">
              <Form.Label>ID Cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por ID de cliente"
                name="clientName"
                value={filters.clientName}
                onChange={handleFilterChange}
              />
            </Form.Group>
          </Row>

          <Button className="mt-2" variant="primary" onClick={handleClearFilters}>
            Limpiar Filtros
          </Button>
        </Form>
      </Row>

      <div id="chart" style={{ marginTop: "30px" }}></div>

      <Table className="table table-bordered table-striped table-hover mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha de Venta</th>
            <th>Total</th>
            <th>ID Cliente</th>
            <th>Nombre Producto</th>
          </tr>
        </thead>
        <tbody>
          {filteredSales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id_venta}</td>
              <td>{new Date(sale.fecha_venta).toLocaleString()}</td>
              <td>{sale.total}</td>
              <td>{sale.cliente_id}</td>
              <td>{sale.nombre_producto}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SalesReport;
