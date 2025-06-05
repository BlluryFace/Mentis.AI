import "../styles/dashboard.css"
import MoodChart from "../pages/Moodchart"
import MoodSummary from "../pages/MoodSummary"
import Stat from "../pages/Stats"
import { Scrollbars } from "react-custom-scrollbars-2";
import Week from "../Components/Week";
export default function Dashboard() {
    return (
        <div className="container">
            <Scrollbars className="scrollContainer">
            <header className="header">
                <div className="headerContent">
                    <div className="logo">
                        Mentis.AI
                    </div>
                    <div className="userProfile">
                        <div className="avatar">JD</div>
                        <span className="userName">John Doe</span>
                    </div>
                </div>
            </header>

                <main className="main">
                    <div className="welcomeSection">
                        <div className="welcomeText">
                            <h1 className="welcomeTitle">Good afternoon, John</h1>
                            <p className="welcomeSubtitle">Here's your mood journey for the past week</p>
                        </div>
                        <div className="actionButtons">
                            <button className="musicButton">Music Recommendation</button>
                            <button className="newEntryButton">New Journal Entry</button>
                        </div>
                    </div>

                    <div className="dashboardGrid">
                        <div className="chartCard">
                            <div className="cardHeader">
                                <h2 className="cardTitle">Weekly Mood Chart</h2>
                            <div className="dateRange">
                                <Week/>
                            </div>
                        </div>
                        <div className="chartContainer">
                            <MoodChart />
                        </div>
                    </div>

                    <div className="summaryCard">
                        <div className="cardHeader">
                            <h2 className="cardTitle">Mood Summary</h2>
                            <div className="badge">Last 7 days</div>

                        </div>
                        <div>
                            <MoodSummary/>
                        </div>

                    </div>

                </div>

                <div className="statsSection">
                    <Stat/>
                </div>
            </main>
            </Scrollbars>
        </div>

    )
}
