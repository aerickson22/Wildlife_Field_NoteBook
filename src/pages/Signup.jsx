import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { PersonCircle, X } from 'react-bootstrap-icons';
import Layout from './../components/Layout.jsx';

export default function Signup() {
    const [ loading, setLoading ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ err, setErr ] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        try {
            const res = await fetch(apiUrl + "/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            if (!res.ok) {
                const json = await res.json();
                setErr(json.error);
                setShow(true);
                setLoading(false);
            } else {
                alert("Account Successfully Created");
                setLoading(false);
                navigate("/login");
            }
        } catch (err) {
            setShow(true);
            setErr(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <Card className="p-3" style={{ width: "100%", maxWidth: "400px" }}>
                        <Card.Header className="text-center border-0 bg-transparent pt-3">
                            <PersonCircle size={64} />
                            <Card.Title className="mt-2 mb-0">Create Account</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Alert show={show} variant="danger" className="d-flex justify-content-between align-items-center py-2">
                                <p className="mb-0">{err}</p>
                                <Button onClick={() => setShow(false)} variant="link" className="p-0 text-danger">
                                    <X size={20} />
                                </Button>
                            </Alert>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group className="mb-3" controlId="formUsername">
                                    <Form.Label>Username*</Form.Label>
                                    <Form.Control
                                        {...register("username", { required: true, minLength: 3 })}
                                        type="text"
                                        placeholder="Enter Username"
                                    />
                                    {errors.username?.type === 'required' && <p className="text-danger small mt-1">Username is required</p>}
                                    {errors.username?.type === 'minLength' && <p className="text-danger small mt-1">Username must be at least 3 characters</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address*</Form.Label>
                                    <Form.Control
                                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                        type="email"
                                        placeholder="Enter Email"
                                    />
                                    {errors.email?.type === 'required' && <p className="text-danger small mt-1">Email is required</p>}
                                    {errors.email?.type === 'pattern' && <p className="text-danger small mt-1">A valid email is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password*</Form.Label>
                                    <Form.Control
                                        {...register("password", { required: true, minLength: 8 })}
                                        type="password"
                                        placeholder="Password"
                                    />
                                    {errors.password?.type === 'required' && <p className="text-danger small mt-1">Password is required</p>}
                                    {errors.password?.type === 'minLength' && <p className="text-danger small mt-1">Password must be at least 8 characters</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formFirstName">
                                    <Form.Label>First Name*</Form.Label>
                                    <Form.Control
                                        {...register("firstName", { required: true })}
                                        type="text"
                                        placeholder="First Name"
                                    />
                                    {errors.firstName && <p className="text-danger small mt-1">First name is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name*</Form.Label>
                                    <Form.Control
                                        {...register("lastName", { required: true })}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                    {errors.lastName && <p className="text-danger small mt-1">Last name is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                                <Form.Group className="text-center">
                                    <Form.Text className="me-1">Already have an account?</Form.Text>
                                    <NavLink to="/login">Login Here</NavLink>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Layout>
        </>
    );
}
