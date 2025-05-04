import React from 'react';
import { Text } from '@radix-ui/themes';

const coreMoods = [
    { category: 'Positive', moods: [{ label: 'Happy', emoji: '😊' }, { label: 'Calm', emoji: '😌' }, { label: 'Loved', emoji: '🥰' }, { label: 'Confident', emoji: '😎' }] },
    { category: 'Neutral', moods: [{ label: 'Neutral', emoji: '😐' }, { label: 'Pensive', emoji: '🤔' }] },
    { category: 'Negative', moods: [{ label: 'Sad', emoji: '😞' }, { label: 'Anxious', emoji: '😟' }, { label: 'Angry', emoji: '😠' }, { label: 'Stressed', emoji: '😩' }] },
    { category: 'Other', moods: [{ label: 'Grateful', emoji: '🙏' }, { label: 'Excited', emoji: '😄' }, { label: 'Tired', emoji: '😴' }] },
];

const purpleColor = '#800080'; // Define your purple color OUTSIDE the component function

function MoodSelector({ onSelect, selectedMood }) {
    return (
        <div>
            {coreMoods.map((categoryData) => (
                <div key={categoryData.category} className="mb-3">
                    <Text size="2" weight="semibold" className="mb-2 text-muted">
                        {categoryData.category}
                    </Text>
                    <div className="d-grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
                        {categoryData.moods.map((mood) => (
                            <button
                                key={mood.label}
                                onClick={() => onSelect(mood.label === selectedMood ? '' : mood.label)}
                                className={`btn btn-outline-primary btn-sm ${mood.label === selectedMood ? 'active' : ''}`}
                                aria-pressed={mood.label === selectedMood}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.5rem',
                                    borderColor: purpleColor,
                                    color: purpleColor,
                                    backgroundColor: mood.label === selectedMood ? purpleColor : 'transparent',
                                    color: mood.label === selectedMood ? 'white' : purpleColor,
                                }}
                            >
                                <span>{mood.emoji}</span>
                                <Text size="2">{mood.label}</Text>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MoodSelector;