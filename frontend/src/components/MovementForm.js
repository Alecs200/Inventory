import React, { useState } from 'react';
import axios from 'axios';

const MovementForm = ({ products, onMovementAdded }) => {
    const [productId, setProductId] = useState('');
    const [type, setType] = useState('entrada');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const now = new Date();
        const formattedDate = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const formattedTime = now.toTimeString().split(' ')[0]; // Formato HH:MM:SS

        const newMovement = {
            productId: parseInt(productId),
            type,
            quantity: parseInt(quantity),
            date: `${formattedDate} ${formattedTime}` // Combina la fecha y la hora
        };

        axios.post('http://localhost:5000/api/movements', newMovement)
            .then(response => {
                onMovementAdded(response.data);
                updateProductStock(response.data);
                resetForm();
            })
            .catch(error => {
                console.error('Hubo un error al registrar el movimiento:', error);
            });
    };

    const updateProductStock = (movement) => {
        const product = products.find(p => p.id === movement.productId);
        const updatedQuantity = movement.type === 'entrada'
            ? product.quantity + movement.quantity
            : product.quantity - movement.quantity;

        axios.put(`http://localhost:5000/api/products/${product.id}`, {
            ...product,
            quantity: updatedQuantity
        })
            .then(response => {
                console.log('Producto actualizado:', response.data);
            })
            .catch(error => {
                console.error('Hubo un error al actualizar el stock:', error);
            });
    };

    const resetForm = () => {
        setProductId('');
        setType('entrada');
        setQuantity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrar Movimiento</h2>
            <div>
                <label>Producto:</label>
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                >
                    <option value="">Selecciona un producto</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Tipo de Movimiento:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                >
                    <option value="entrada">Entrada</option>
                    <option value="salida">Salida</option>
                </select>
            </div>
            <div>
                <label>Cantidad:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Registrar Movimiento</button>
        </form>
    );
};

export default MovementForm;
