import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext'; // Updated import
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuthContext(); // Access login function from AuthContext
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for session-based authentication
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid login credentials.');
                return;
            }

            const data = await response.json();
            login(data.user); // Update context with logged-in user
            navigate('/'); // Redirect to the homepage
        } catch (err) {
            setError('Failed to connect to the server. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <h2>Log in to Your Account</h2>
            {error && <p className="error-message">{error}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log in</button>
            </form>
            <p className="signup-text">
                Don't have an account? <a href="/signup">Sign up</a>.
            </p>
        </div>
    );
};

export default Login;
