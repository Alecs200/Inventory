import React from 'react';

const Dashboard = ({ products }) => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(product => product.quantity < 5);

    return (
        <div>
            <h2>Resumen del Inventario</h2>
            <p>Total de Productos: {totalProducts}</p>
            {lowStockProducts.length > 0 && (
                <div>
                    <h3>Productos con Stock Bajo</h3>
                    <ul>
                        {lowStockProducts.map(product => (
                            <li key={product.id}>
                                {product.name} - Cantidad: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
