import React from 'react';
import axios from 'axios';

const ProductList = ({ products, setProducts, onEditProduct }) => {

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/${id}`)
            .then(() => {
                setProducts(products.filter(product => product.id !== id));
            })
            .catch(error => {
                console.error('Hubo un error al eliminar el producto:', error);
            });
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - ${product.price} - Cantidad: {product.quantity}
                        <button onClick={() => onEditProduct(product)}>Editar</button>
                        <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
