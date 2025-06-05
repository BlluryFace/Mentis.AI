import "../styles/stats.css"

export default function Stats() {
    return (
        <div className="statContainer">
            <div className="statCard">
                <div className="statLabel">Current Streak</div>
                <div className="statValue">7 days</div>
                <div className="statDescription">Keep going! You're on a roll.</div>
            </div>
            <div className="statCard">
                <div className="statLabel">Entries This Month</div>
                <div className="statValue">15</div>
            </div>

            <div className="statCard">
                <div className="statLabel">Dominant Mood</div>
                <div className="dominantMood">
                    <span className="dominantEmoji">😊</span>
                    <span className="statValue">Happy</span>
                </div>
                <div className="statDescription">42% of entries</div>
            </div>
        </div>
    )
}
