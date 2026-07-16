import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import { login } from "../../services/auth";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await login(formData);

            navigate("/");

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                "Invalid email or password."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-left">

                <h1>ModyMap</h1>

                <p>

                    Smart Campus Navigation System

                </p>

            </div>

            <div className="login-right">

                <div className="login-card">

                    <h2>Welcome Back</h2>

                    <p>

                        Login to continue using ModyMap

                    </p>

                    {error && (

                        <div className="login-error">

                            {error}

                        </div>

                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email</label>

                            <input

                                type="email"

                                name="email"

                                placeholder="Enter your email"

                                value={formData.email}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input

                                type="password"

                                name="password"

                                placeholder="Enter your password"

                                value={formData.password}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <button

                            type="submit"

                            className="login-btn"

                            disabled={loading}

                        >

                            {loading

                                ? "Signing In..."

                                : "Login"}

                        </button>

                    </form>

                    <div className="login-footer">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}