import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoodSelector from './JournalEntryPage/MoodSelector';
import ActivitySelector from './JournalEntryPage/ActivitySelector';

function ReflectJournalPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [entryTitle, setEntryTitle] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [saveEnabled, setSaveEnabled] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const templates = [
    { label: "Gratitude", title: "Things I'm Grateful For", body: "I'm grateful for:\n1. ...\n2. ...\n3. ..." },
    { label: "Happiness", title: "What Made Me Happy Today", body: "I'm happy about..." },
    { label: "Love & Romance", title: "Thoughts on Love", body: "I'm in love about..." },
    { label: "Sadness", title: "Dealing with Sadness", body: "Today I felt sad because..." },
    { label: "Pensive", title: "Deep Thoughts", body: "I'm pensive about..." },
    { label: "Plans", title: "My Plans for Tomorrow", body: "My plans for tomorrow include..." },
  ];

  const purpleButtonStyle = {
    backgroundColor: '#800080',
    borderColor: '#800080',
    color: 'white',
  };
  const bluePurpleButtonStyle = {
    backgroundColor: '#6A5ACD', // MediumPurple
    borderColor: '#6A5ACD',
    color: 'white',
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setSaveEnabled(!!mood || !!entryTitle.trim() || !!journalEntry.trim());
  };

  const handleActivitySelect = (activity) => {
    setSelectedActivities((prev) => (prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'entry-title') setEntryTitle(value);
    if (id === 'journal-entry') {
      setJournalEntry(value);
      setWordCount(value.trim().split(/\s+/).filter(Boolean).length);
    }
    setSaveEnabled(!!selectedMood || !!entryTitle.trim() || !!journalEntry.trim());
  };

  const handleSaveEntry = () => {
    if (saveEnabled) {
      const entryData = { mood: selectedMood, title: entryTitle, text: journalEntry, activities: selectedActivities, isBold, isItalic };
      console.log('Saving entry:', entryData);
      alert('Journal entry saved!');
      // In a real application, handle saving to a backend
    } else {
      alert('Please select a mood or add a title/content to save.');
    }
  };

  const handleBoldClick = () => {
    setIsBold(!isBold);
  };

  const handleItalicClick = () => {
    setIsItalic(!isItalic);
  };

  const handleTemplateSelect = (template) => {
    setEntryTitle(template.title);
    setJournalEntry(template.body);
  };

  return (
      <Container className="mt-4">
        <h1>Reflect Journal</h1>
        <Row className="mt-3">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>How are you feeling?</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Select a mood that best describes you right now
                </Card.Subtitle>
                <div className="mood-grid">
                  <MoodSelector onSelect={handleMoodSelect} selectedMood={selectedMood} />
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Activities</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Select activities:</Card.Subtitle>
                <div className="activity-grid">
                  <ActivitySelector onSelect={handleActivitySelect} selectedActivities={selectedActivities} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-end mb-3 gap-2">
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-format">
                      Format
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                          onClick={handleBoldClick}
                          active={isBold}
                          style={isBold ? purpleButtonStyle : {}}
                      >
                        Bold
                      </Dropdown.Item>
                      <Dropdown.Item
                          onClick={handleItalicClick}
                          active={isItalic}
                          style={isItalic ? purpleButtonStyle : {}}
                      >
                        Italic
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-secondary"
                        size="sm"
                        id="dropdown-template"
                        style={bluePurpleButtonStyle} // Applied solid blue-ish purple here
                    >
                      Template
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {templates.map((template) => (
                          <Dropdown.Item key={template.label} onClick={() => handleTemplateSelect(template)}>
                            {template.label}
                          </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button variant="primary" onClick={handleSaveEntry} disabled={!saveEnabled} style={bluePurpleButtonStyle}>
                    Save Entry
                  </Button>
                </div>
                <Form.Group className="mb-3" controlId="entry-title">
                  <Form.Label htmlFor="entry-title">Give your entry a title...</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Give your entry a title..."
                      value={entryTitle}
                      onChange={handleInputChange}
                      id="entry-title"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="journal-entry">
                  <Form.Label htmlFor="journal-entry">Write your thoughts here...</Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={8}
                      placeholder="Write your thoughts here... What's on your mind today?"
                      value={journalEntry}
                      onChange={handleInputChange}
                      id="journal-entry"
                      style={{
                        fontWeight: isBold ? 'bold' : 'normal',
                        fontStyle: isItalic ? 'italic' : 'normal',
                      }}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    Feeling: <Button variant="light" size="sm" disabled>{selectedMood || 'Not selected'}</Button>
                  </div>
                  <small className="text-muted">{wordCount} words</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default ReflectJournalPage;