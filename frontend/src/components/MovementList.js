import React from 'react';

const MovementList = ({ movements }) => {
    return (
        <div>
            <h2>Movimientos de Inventario</h2>
            <ul>
                {movements.length > 0 ? (
                    movements.map(movement => (
                        <li key={movement.id}>
                            Producto ID: {movement.productId} - Tipo: {movement.type} - Cantidad: {movement.quantity} - Fecha: {movement.date}
                        </li>
                    ))
                ) : (
                    <p>No hay movimientos registrados.</p>
                )}
            </ul>
        </div>
    );
};

export default MovementList;
