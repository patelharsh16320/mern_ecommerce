import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MyAccount = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        mobile: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                created_at: new Date().toISOString(),
                modified_at: new Date().toISOString()
            };
            console.log("payload:", payload)
            const apiUrl = `${import.meta.env.VITE_BACKEND_API}/create-user`;            
            const res = await axios.post(apiUrl, payload);
            
            console.log("res:", res)
            alert('User created successfully!');
        } catch (err) {
            console.error('Error creating user:', err);
            alert('Failed to create user.');
        }
    };

    return (
        <>
            <section id='main' className="container d-flex my-5">
                <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                        <div className="login-left">
                            <img src="../../upload/sign-up.svg" alt="Login Illustration" className="login-image w-100 hover-filter-image" />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <Typography variant="h5" gutterBottom>
                            Create My Account
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="First Name"
                                name="first_name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Last Name"
                                name="last_name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Mobile"
                                name="mobile"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.mobile}
                                onChange={handleChange}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                sx={{ mt: 2 }}
                                className='dark-clr'
                            >
                                Submit
                            </Button>
                        </form>
                        <p className='mt-3'>
                        <Link to="/login">Already have an Account <FaHandPointRight /></Link>
                        </p>

                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccount;
