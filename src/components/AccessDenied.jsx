import { Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Layout from "./Layout";

export default function AccessDenied(){
    return (
        <Layout>
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <Card className="p-3" style={{ width: "100%", maxWidth: "400px" }}>
                    <Card.Header className="text-center border-0 bg-transparent pt-3">
                        <Card.Title className="mt-2 mb-0">Login Required</Card.Title>
                    </Card.Header>
                    <Card.Body className="text-center">
                        <Card.Text>
                            Loging required to access page
                        </Card.Text>
                        <NavLink to="/login">Login Here</NavLink>
                    </Card.Body>
                </Card>
            </div>
        </Layout>
    );
}
