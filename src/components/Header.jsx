import { NavLink } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { Person, Search } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { Container, Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    const { user } = useUser();
    const { handleSubmit, register } = useForm();
    const onSubmit = values => console.log(values);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={NavLink} to="/">My Field Notebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={NavLink} to="/log">Log Sighting</Nav.Link>
                        <Nav.Link as={NavLink} to="/map">Map of Your Logs</Nav.Link>
                        {user === null ? (
                            <Nav.Link as={NavLink} to="/login"><Person/> Login</Nav.Link>
                        ) : (
                            <Nav.Link><Person/> {user.username}</Nav.Link>
                        )}
                        <Form onSubmit={handleSubmit(onSubmit)} className="ms-lg-3">
                            <Form.Group className="d-flex align-items-center">
                                <Form.Label className="me-2 mb-0"><Search/></Form.Label>
                                <Form.Control type="text" {...register("searchQuery")} placeholder="Search for a Log...." />
                            </Form.Group>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
