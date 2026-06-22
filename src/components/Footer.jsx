import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className="bg-light border-top py-4 mt-auto">
        <Container>
            <Row className="align-items-center justify-content-between text-center text-md-start">
            <Col md="auto" className="mb-2 mb-md-0 text-muted">
                &copy; {new Date().getFullYear()} Alex Erickson. All rights reserved.
            </Col>
            <Col md="auto">
                <div className="d-flex justify-content-center gap-3">
                    <p>Contact: aerickson22205@gmail.com</p>
                </div>
            </Col>
            </Row>
        </Container>
        </footer>
    );
}
