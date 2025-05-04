import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function TimeCapsulePage() {
    const [deliveryDate, setDeliveryDate] = useState('');
    const [email, setEmail] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [message, setMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const purpleButtonStyle = {
        backgroundColor: '#800080',
        borderColor: '#800080',
        color: 'white',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ deliveryDate, email, messageTitle, message });
        setShowSuccessAlert(true);
        // In a real application, you would send this data to your backend
    };

    return (
        <Container className="mt-4">
            <h1>Time Capsule</h1>
            <p>Send a message to your future self</p>
            <Alert variant="info">
                <i className="bi bi-info-circle-fill me-2"></i> Your message will be delivered to you on the date you select via
                the email address you provide.
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="deliveryDate">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                    <Form.Text className="text-muted">Choose any date in the future when you'd like to receive this message.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Your Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="your@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">We'll send your message to this email address.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="messageTitle">
                    <Form.Label>Message Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title for your message"
                        value={messageTitle}
                        onChange={(e) => setMessageTitle(e.target.value)}
                    />
                    <Form.Text className="text-muted">Enter a title for your message.</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="message">
                    <Form.Label>Your Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Write your message to your future self here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">Write your message to your future self...</Form.Text>
                </Form.Group>

                <Button type="submit" style={purpleButtonStyle}>
                    Send Message
                </Button>

                {showSuccessAlert && (
                    <Alert variant="success" className="mt-3">
                        Your message has been scheduled for delivery!
                    </Alert>
                )}
            </Form>
        </Container>
    );
}

export default TimeCapsulePage;