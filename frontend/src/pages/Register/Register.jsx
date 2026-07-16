import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";

import { register } from "../../services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

        confirmPassword: ""

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

        setError("");

        if(formData.password !== formData.confirmPassword){

            setError("Passwords do not match.");

            return;

        }

        setLoading(true);

        try{

            await register({

                firstName: formData.firstName,

                lastName: formData.lastName,

                email: formData.email,

                password: formData.password

            });

            navigate("/login");

        }

        catch(err){

            setError(

                err.response?.data?.message ||

                "Unable to register."

            );

        }

        finally{

            setLoading(false);

        }

    };

    return(

        <div className="register-page">

            <div className="register-left">

                <h1>ModyMap</h1>

                <p>

                    Join the Smart Campus Navigation System

                </p>

            </div>

            <div className="register-right">

                <div className="register-card">

                    <h2>Create Account</h2>

                    <p>

                        Register to start exploring the campus.

                    </p>

                    {

                        error &&

                        <div className="register-error">

                            {error}

                        </div>

                    }

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>First Name</label>

                            <input

                                type="text"

                                name="firstName"

                                value={formData.firstName}

                                onChange={handleChange}

                                placeholder="Enter first name"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Last Name</label>

                            <input

                                type="text"

                                name="lastName"

                                value={formData.lastName}

                                onChange={handleChange}

                                placeholder="Enter last name"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Email</label>

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                placeholder="Enter email"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Password</label>

                            <input

                                type="password"

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                placeholder="Create password"

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Confirm Password</label>

                            <input

                                type="password"

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                placeholder="Confirm password"

                                required

                            />

                        </div>

                        <button

                            className="register-btn"

                            type="submit"

                            disabled={loading}

                        >

                            {

                                loading ?

                                "Creating Account..." :

                                "Register"

                            }

                        </button>

                    </form>

                    <div className="register-footer">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );

}