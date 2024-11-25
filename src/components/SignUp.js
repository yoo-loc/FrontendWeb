import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState({ type: '', text: '' }); // For success or error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' }); // Clear previous messages

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            let data = null;

            // Handle potential empty or malformed JSON responses
            try {
                data = await response.json();
            } catch {
                data = { message: 'Unexpected error. Please try again.' };
            }

            if (response.ok) {
                setMessage({ type: 'success', text: data.message });
                setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
            } else {
                setMessage({ type: 'error', text: data.message || 'Sign-up failed' });
            }
        } catch (err) {
            console.error('Sign-up error:', err);
            setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        }
    };

    return (
        <div className="signup-page">
            <h2>Create an Account</h2>
            {message.text && (
                <p className={message.type === 'success' ? 'success-message' : 'error-message'}>
                    {message.text}
                </p>
            )}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign Up</button>
            </form>
            <p className="login-text">
                Already have an account? <a href="/login">Log in</a>.
            </p>
        </div>
    );
};

export default SignUp;
