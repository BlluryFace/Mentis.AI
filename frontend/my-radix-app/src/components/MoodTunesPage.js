import React, { useState } from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';

function MoodTunesPage() {
    const [currentMood, setCurrentMood] = useState('Focused');
    const moods = ['Happy', 'Relaxed', 'Energetic', 'Focused', 'Melancholic', 'Romantic'];
    const purpleButtonStyle = {
        backgroundColor: '#800080', // Example purple color (you can adjust this)
        borderColor: '#800080',
        color: 'white',
    };
    const purpleOutlineButtonStyle = {
        borderColor: '#800080',
        color: '#800080',
        backgroundColor: 'transparent',
    };

    const recommendationsData = {
        Happy: [
            { title: 'Upbeat Pop', artist: 'Various' },
            { title: 'Sunny Indie', artist: 'Artist 2' },
        ],
        Relaxed: [
            { title: 'Ambient Study', artist: 'Brian Eno' },
            { title: 'Chill Lo-fi', artist: 'Artist 4' },
        ],
        Energetic: [
            { title: 'Electronic Dance', artist: 'Artist 5' },
            { title: 'High-Energy Rock', artist: 'Artist 6' },
        ],
        Focused: [
            { title: 'Deep Focus', artist: 'Nils Frahm' },
            { title: 'Productivity Zone', artist: 'Tycho' },
        ],
        Melancholic: [
            { title: 'Sad Piano', artist: 'Artist 7' },
            { title: 'Brooding Ballads', artist: 'Artist 8' },
        ],
        Romantic: [
            { title: 'Soft Acoustic', artist: 'Artist 9' },
            { title: 'Soulful Vocals', artist: 'Artist 10' },
        ],
    };

    const handleMoodClick = (mood) => {
        setCurrentMood(mood);
        console.log(`Selected mood: ${mood}`);
    };

    const currentRecommendations = recommendationsData[currentMood] || [];

    return (
        <Container className="mt-4">
            <div className="mb-4 p-4" style={{ backgroundColor: '#e9ecef', borderRadius: '8px' }}>
                <h2>CURRENT MOOD</h2>
                <h1>{currentMood}</h1>
                <p>
                    Music to help you concentrate and maintain productivity. Perfect for deep work sessions and creative tasks.
                </p>
                <div>
                    {moods.map((mood) => (
                        <Button
                            key={mood}
                            style={currentMood === mood ? purpleButtonStyle : purpleOutlineButtonStyle}
                            className="me-2 mb-2"
                            onClick={() => handleMoodClick(mood)}
                        >
                            {mood}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h2>Top Recommendations</h2>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {currentRecommendations.map((recommendation, index) => (
                        <Col key={index}>
                            <Card>
                                <div style={{ width: '100%', height: '320px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <small>400 x 320</small>
                                </div>
                                <Card.Body>
                                    <Card.Title>{recommendation.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{recommendation.artist}</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default MoodTunesPage;