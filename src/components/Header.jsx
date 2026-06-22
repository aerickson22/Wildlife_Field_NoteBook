import { Link, NavLink } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { Person } from "react-bootstrap-icons";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Footer() {
    const { user, setUser } = useUser();

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/"><NavLink to="/">My Field Notebook</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/log">Log Sighting</Nav.Link>
                        <Nav.Link href="/sighting/:id">Find a Log Sighting</Nav.Link>
                        <Nav.Link href="/map">Map of Your Logs</Nav.Link>
                        {user === null ? <Nav.Link href="login"><Person/> Login</Nav.Link> : <Nav.Link><Person/> user.username</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
