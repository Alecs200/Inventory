import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import MovementList from './components/MovementList';
import MovementForm from './components/MovementForm';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [movements, setMovements] = useState([]);

    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('http://localhost:5000/api/products')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('Hubo un error al obtener los productos:', error);
                });
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('http://localhost:5000/api/movements')
                .then(response => {
                    setMovements(response.data);
                })
                .catch(error => {
                    console.error('Hubo un error al obtener los movimientos:', error);
                });
        }
    }, [isAuthenticated]);

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const handleProductUpdated = (updatedProduct) => {
        setProducts(products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
        setProductToEdit(null);
    };

    const handleEditProduct = (product) => {
        setProductToEdit(product);
    };

    const handleMovementAdded = (newMovement) => {
        setMovements([...movements, newMovement]);

        const updatedProducts = products.map(product => {
            if (product.id === newMovement.productId) {
                const updatedQuantity = newMovement.type === 'entrada'
                    ? product.quantity + newMovement.quantity
                    : product.quantity - newMovement.quantity;

                return { ...product, quantity: updatedQuantity };
            }
            return product;
        });

        setProducts(updatedProducts);
    };

    return (
        <Router>
            <Routes>
                {/* Ruta para el login */}
                <Route path="/login" element={<Login />} />

                {/* Redirigir a login si el usuario no está autenticado */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Rutas protegidas para el dashboard */}
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <div className="App">
                            <h1>Sistema de Gestión de Inventario</h1>
                            <Dashboard products={products} />
                            <ProductForm
                                onProductAdded={handleProductAdded}
                                productToEdit={productToEdit}
                                onProductUpdated={handleProductUpdated}
                            />
                            <ProductList
                                products={products}
                                setProducts={setProducts}
                                onEditProduct={handleEditProduct}
                            />
                            <MovementForm
                                products={products}
                                onMovementAdded={handleMovementAdded}
                            />
                            <MovementList movements={movements} />
                        </div>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
