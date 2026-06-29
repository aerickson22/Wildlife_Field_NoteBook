import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useUser } from './../utils/UserContext.jsx';
import { PersonCircle, X, Eye, EyeSlash  } from 'react-bootstrap-icons';
import Layout from './../components/Layout.jsx';
import AccessDenied from './../components/AccessDenied.jsx'

export default function LogSighting() {
    const { user, setUser } = useUser();
    const [ loading, setLoading ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ err, setErr ] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = () => {};

    if(!user){
        return (<><AccessDenied /></>);
    }

    return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-3" style={{ width: "100%", maxWidth: "400px" }}>
                    <Card.Header className="text-center border-0 bg-transparent pt-3">
                        <Card.Title className="mt-2 mb-0">Log A Field Note</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Alert show={show} variant="danger" className="d-flex justify-content-between align-items-center py-2">
                            <p className="mb-0">{err}</p>
                            <Button onClick={() => setShow(false)} variant="link" className="p-0 text-danger">
                                    <X size={20} />
                            </Button>
                        </Alert>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    );
}
