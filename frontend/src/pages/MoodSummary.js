import "../styles/moodsummary.css"

export default function MoodSummary() {
    const moods = [
        {
            emoji: "😊",
            name: "Happy",
            entries: 4,
            percentage: 42,
        },
        {
            emoji: "😌",
            name: "Calm",
            entries: 2,
            percentage: 21,
        },
        {
            emoji: "🤔",
            name: "Pensive",
            entries: 2,
            percentage: 21,
        },
        {
            emoji: "😔",
            name: "Sad",
            entries: 1,
            percentage: 11,
        },
        {
            emoji: "😰",
            name: "Anxious",
            entries: 1,
            percentage: 5,
        },
    ]

    return (
        <div className="moodContainer">
            {moods.map((mood, index) => (
                <div key={index} className="moodItem">
                    <div className="moodInfo">
                        <div className="emoji">{mood.emoji}</div>
                        <div className="moodDetails">
                            <div className="moodName">{mood.name}</div>
                            <div className="moodEntries">
                                {mood.entries} {mood.entries === 1 ? "entry" : "entries"}
                            </div>
                        </div>
                    </div>
                    <div className="percentage">{mood.percentage}%</div>
                </div>
            ))}
        </div>
    )
}
