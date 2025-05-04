import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // ENSURE THIS IS HERE
import Navbar from './components/Navbar';
import TimeCapsulePage from './components/TimeCapsulePage';
import MoodTunesPage from './components/MoodTunesPage';
import JournalEntryPage from './components/JournalEntryPage';

function App() {
    return (
        <Theme>
            <Router>
                <Navbar />
                <div style={{ paddingTop: '60px' }}>
                    <Routes>
                        <Route path="/" element={<TimeCapsulePage />} />
                        <Route path="/mood-tunes" element={<MoodTunesPage />} />
                        <Route path="/journal" element={<JournalEntryPage />} />
                    </Routes>
                </div>
            </Router>
        </Theme>
    );
}

export default App;