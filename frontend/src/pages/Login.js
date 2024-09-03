import React, { useState } from 'react'; // Asegúrate de importar useState
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import axios from 'axios'; // Asegúrate de importar axios

const Login = () => {
    const [username, setUsername] = useState(''); // Usa useState para controlar el estado de username
    const [password, setPassword] = useState(''); // Usa useState para controlar el estado de password
    const [error, setError] = useState(''); // Usa useState para controlar el estado del mensaje de error
    const navigate = useNavigate(); // Usa useNavigate para redirigir al usuario después del login

    const handleLogin = (event) => {
        event.preventDefault();

        // Petición POST al backend para la autenticación
        axios.post('http://localhost:5000/api/login', { username, password })
            .then(response => {
                if (response.data.success) {
                    // Guardar el token en localStorage y redirigir a la página principal
                    localStorage.setItem('token', response.data.token);
                    navigate('/'); // Redirige a la página principal
                } else {
                    setError('Usuario o contraseña incorrectos');
                }
            })
            .catch(error => {
                console.error('Error al intentar iniciar sesión:', error);
                setError('Error en el servidor. Por favor, intenta más tarde.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
