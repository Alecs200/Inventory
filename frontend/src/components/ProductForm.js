import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded, productToEdit, onProductUpdated }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price);
            setQuantity(productToEdit.quantity);
        }
    }, [productToEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const productData = {
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };

        if (productToEdit) {
            // Si existe un producto para editar, actualízalo
            axios.put(`http://localhost:5000/api/products/${productToEdit.id}`, productData)
                .then(response => {
                    onProductUpdated(response.data);
                    resetForm();
                })
                .catch(error => {
                    console.error('Hubo un error al actualizar el producto:', error);
                });
        } else {
            // Si no hay producto para editar, crea uno nuevo
            axios.post('http://localhost:5000/api/products', productData)
                .then(response => {
                    onProductAdded(response.data);
                    resetForm();
                })
                .catch(error => {
                    console.error('Hubo un error al agregar el producto:', error);
                });
        }
    };

    const resetForm = () => {
        setName('');
        setPrice('');
        setQuantity('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{productToEdit ? 'Editar Producto' : 'Agregar Producto'}</h2>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
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
            <button type="submit">{productToEdit ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        </form>
    );
};

export default ProductForm;
