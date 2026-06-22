import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useUser } from './../utils/UserContext.jsx';
import { PersonCircle, X } from 'react-bootstrap-icons';
import Layout from './../components/Layout.jsx';

export default function Login(){
    const { user, setUser } = useUser();
    const [ loading, setLoading ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ err, setErr ] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const toggleShow = () => setShow(!show);

    const onSubmit = async(data) => {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        try{
            const res = await fetch(apiUrl + "/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if(!res.ok){
                setShow(true);
                setErr("Invalid Login Attempt");
                setLoading(false);
            }else{
                alert("Login Successful");
                const json = await res.json();
                setUser(json);
                setLoading(false);
                navigate("/");
            }
        }catch(err){
            setShow(true);
            setErr("Invalid Login Attempt");
            setLoading(false);
        }
    }

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <Card className="p-3" style={{ width: "100%", maxWidth: "400px" }}>
                        <Card.Header className="text-center border-0 bg-transparent pt-3">
                            <PersonCircle size={64} />
                            <Card.Title className="mt-2 mb-0">Login</Card.Title>
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
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                    {...register("username", { required: true })}
                                    type="username"
                                    placeholder="Enter Username"
                                    />
                                    {errors.username && <p className="text-danger small mt-1">Username is required</p>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                    {...register("password", { required: true })}
                                    type="password"
                                    placeholder="Password"
                                    />
                                    {errors.password && <p className="text-danger small mt-1">Password is required</p>}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" className="me-2" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                                <Form.Group className="text-center">
                                    <Form.Text className="me-1">New here?</Form.Text>
                                    <NavLink to="/signup">Sign Up</NavLink>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Layout>
        </>
    );
};

