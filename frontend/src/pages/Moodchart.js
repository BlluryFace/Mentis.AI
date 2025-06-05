import { useRef } from "react"
import "../styles/moodchart.css"

export default function MoodChart() {
    const chartRef = useRef<HTMLDivElement>(null)

    const data = [
        { day: "Mon", positive: 30, neutral: 40, challenging: 30 },
        { day: "Tue", positive: 45, neutral: 25, challenging: 30 },
        { day: "Wed", positive: 35, neutral: 30, challenging: 35 },
        { day: "Thu", positive: 50, neutral: 30, challenging: 20 },
        { day: "Fri", positive: 40, neutral: 15, challenging: 45 },
        { day: "Sat", positive: 60, neutral: 20, challenging: 20 },
        { day: "Sun", positive: 55, neutral: 15, challenging: 30 },
    ]

    return (
        <div className="moodChartContainer">
            <div className="legend">
                <div className="legendItem">
                    <div className="legendColor-positive"></div>
                    <span className="legendText">Positive Moods</span>
                </div>
                <div className="legendItem">
                    <div className="legendColor-neutral"></div>
                    <span className="legendText">Neutral Moods</span>
                </div>
                <div className="legendItem">
                    <div className="legendColor-challenging"></div>
                    <span className="legendText">Challenging Moods</span>
                </div>
            </div>
            <div className="chart">
                {data.map((day, index) => (
                    <div key={index} className="day-column">
                        <div className="bar-container">
                            <div className="bar challenging-bar" style={{height: `${day.challenging * 3}px`}}></div>
                            <div className="bar neutral-bar" style={{height: `${day.neutral * 3}px`}}></div>
                            <div className="bar positive-bar" style={{height: `${day.positive * 3}px`}}></div>
                        </div>
                        <div className="day-label">{day.day}</div>
                    </div>
                ))}
            </div>

            <div>

            </div>
        </div>
    )
}