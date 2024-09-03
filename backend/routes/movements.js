const express = require('express');
const router = express.Router();

let movements = [
    // Movimientos iniciales si los tienes...
];

// Obtener todos los movimientos
router.get('/', (req, res) => {
    res.json(movements);
});

// Crear un nuevo movimiento
router.post('/', (req, res) => {
    const newMovement = {
        id: movements.length + 1,
        productId: req.body.productId,
        type: req.body.type,
        quantity: req.body.quantity,
        date: req.body.date
    };
    movements.push(newMovement);
    res.status(201).json(newMovement); // Responder con el movimiento creado
});

// Otras rutas (opcional)...

module.exports = router;
