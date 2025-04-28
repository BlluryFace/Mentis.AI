import React from 'react';
import { Text } from '@radix-ui/themes';
// import styles from '../JournalEntryForm.module.css'; // Remove this import

const coreActivities = [
    { label: 'Work', emoji: '💼' },
    { label: 'Exercise', emoji: '💪' },
    { label: 'Social', emoji: '🗣️' },
    { label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { label: 'Relaxation', emoji: '🧘' },
    { label: 'Creativity', emoji: '🎨' },
    { label: 'Travel', emoji: '✈️' },
    { label: 'Learning', emoji: '📚' },
];

function ActivitySelector({ onSelect, selectedActivities }) {
    return (
        <div className="d-flex flex-wrap gap-2">
            {coreActivities.map((activity) => (
                <button
                    key={activity.label}
                    onClick={() => onSelect(selectedActivities.includes(activity.label) ? '' : activity.label)}
                    className={`btn btn-outline-secondary btn-sm ${selectedActivities.includes(activity.label) ? 'active' : ''}`}
                    aria-pressed={selectedActivities.includes(activity.label)}
                    style={{ marginBottom: '0.5rem' }}
                >
                    <span>{activity.emoji}</span>
                    <Text size="2">{activity.label}</Text>
                </button>
            ))}
        </div>
    );
}

export default ActivitySelector;