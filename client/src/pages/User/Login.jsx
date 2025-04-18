import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section id='main' className="login-container container d-flex">
            <div className="row align-items-center container">
                <div className="col-md-6 col-12">
                    <div className="login-left">
                        <img src="../../upload/login.png" alt="Login Illustration" className="login-image w-100 hover-filter-image" />
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="login-right">
                        <div className="login-card">
                            <div className="user-avatar">
                                <img src="/upload/user.svg" alt="User" />
                            </div>
                            <h2>Welcome</h2>
                            <form className="login-form">
                                <TextField
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    label="Password"
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    required
                                />
                                <div className="forgot-password">
                                    <a href="#">Forgot Password?</a>
                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    className='dark-clr'
                                >
                                    Login
                                </Button>
                            </form>
                            <p className='mt-3'>
                                <Link to="/account">Create Account <FaHandPointRight /></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default Login;
