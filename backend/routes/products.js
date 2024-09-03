const express = require('express');
const router = express.Router();

let products = [
    { id: 1, name: "Laptop HP Pavilion", price: 1200, quantity: 15 },
    { id: 2, name: "Smartphone Samsung Galaxy S21", price: 999, quantity: 25 },
    { id: 3, name: "Monitor Dell 24\"", price: 250, quantity: 10 },
    { id: 4, name: "Teclado Mecánico Logitech", price: 80, quantity: 50 },
    { id: 5, name: "Ratón Inalámbrico Microsoft", price: 30, quantity: 100 }
];

// Obtener todos los productos
router.get('/', (req, res) => {
    res.json(products);
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado');
    res.json(product);
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    products.push(newProduct);
    res.status(201).json(newProduct); // Responde con el nuevo producto
});

// Actualizar un producto existente
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Producto no encontrado');

    product.name = req.body.name;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    res.json(product);
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;
