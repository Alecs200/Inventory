const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Datos iniciales con productos y movimientos realistas
let products = [
    { id: 1, name: "Laptop HP Pavilion", price: 1200, quantity: 15 },
    { id: 2, name: "Smartphone Samsung Galaxy S21", price: 999, quantity: 25 },
    { id: 3, name: "Monitor Dell 24\"", price: 250, quantity: 10 },
    { id: 4, name: "Teclado Mecánico Logitech", price: 80, quantity: 50 },
    { id: 5, name: "Ratón Inalámbrico Microsoft", price: 30, quantity: 100 },
    { id: 6, name: "Laptop Apple MacBook Pro", price: 2400, quantity: 12 },
    { id: 7, name: "Smartwatch Apple Watch Series 6", price: 450, quantity: 45 },
    { id: 8, name: "Cámara Canon EOS R6", price: 2500, quantity: 5 },
    { id: 9, name: "Auriculares Bose Noise Cancelling 700", price: 379, quantity: 60 },
    { id: 10, name: "Impresora HP LaserJet Pro", price: 250, quantity: 15 }
];

let movements = [
    { id: 1, productId: 1, type: "entrada", quantity: 5, date: "2024-09-01" },
    { id: 2, productId: 2, type: "salida", quantity: 3, date: "2024-09-02" },
    { id: 3, productId: 3, type: "entrada", quantity: 2, date: "2024-09-03" },
    { id: 4, productId: 4, type: "salida", quantity: 7, date: "2024-09-04" },
    { id: 5, productId: 5, type: "entrada", quantity: 10, date: "2024-09-05" },
    { id: 6, productId: 6, type: "entrada", quantity: 3, date: "2024-09-06" },
    { id: 7, productId: 7, type: "salida", quantity: 5, date: "2024-09-07" },
    { id: 8, productId: 8, type: "entrada", quantity: 1, date: "2024-09-08" },
    { id: 9, productId: 9, type: "salida", quantity: 10, date: "2024-09-09" },
    { id: 10, productId: 10, type: "entrada", quantity: 8, date: "2024-09-10" }
];

// Ruta principal
app.get('/', (req, res) => {
    const summary = {
        totalProducts: products.length,
        totalMovements: movements.length,
        products: products,
        movements: movements
    };
    res.json(summary);
});

// Ruta de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Autenticación básica (esto es solo un ejemplo, deberías hacer la autenticación real en producción)
    if (username === 'admin' && password === 'admin') {
        return res.json({ success: true, token: '1234567890' });
    }

    res.json({ success: false, message: 'Credenciales incorrectas' });
});

// Rutas para productos y movimientos
const productRoutes = require('./routes/products');
const movementRoutes = require('./routes/movements');

app.use('/api/products', productRoutes);
app.use('/api/movements', movementRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
