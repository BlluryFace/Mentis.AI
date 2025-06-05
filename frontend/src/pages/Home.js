import React, { useState } from "react";
import {Link,  useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Feature from "../Components/Feature";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Box } from "@radix-ui/themes";
import ChatBotImage from "../assets/chatbot.png";
import "../styles/styles.css";
import testImage from "../assets/try.png";
import musicImage from "../assets/headphones.png";
import graphImage from "../assets/bar-graph.png";
import diaryImage from "../assets/diary.png";
import emotionalImage from "../assets/emotional.png";


function Home() {
    const navigate = useNavigate();
    const [activeQuestion, setActiveQuestion] = useState(null);
    const chatbot = () => {
        navigate("/chatbot");
    };
    const dashboard = () => {
        navigate("/Dashboard");
    };
    const faqs = [
        {
            id: 1,
            question: "How does it work?",
            answer: "Mentis.AI uses a user-friendly interface to help you log your feelings and moods. You can access personalized insights and recommendations based on your entries."
        },
        {
            id: 2,
            question: "Is my data secure?",
            answer: "Absolutely! We prioritize your privacy and security. All your data is encrypted and stored securely, ensuring that only you have access to your personal information."
        },
        {
            id: 3,
            question: "Can I track progress?",
            answer: "Yes, Mentis.AI allows you to monitor your mood trends over time. You can visualize your emotional journey through charts and reports. This feature helps you understand patterns and triggers in your mental health."
        },
    ];

    return (
        <div className="container">

            <Scrollbars className="scrollContainer">
                <div className="content">
                    <Header></Header>
                    <div className="section-feature-one">
                        <div className="feature-container-one">
                            <div className="feature-left-one">
                                <h2 className="feature-title-one">Mentis.AI</h2>
                                <p className="feature-description">
                                    Discover a supportive space for your mental
                                    well-being.
                                    Join us in taking proactive steps towards a
                                    healthier mind.</p>
                                <Link to="/login" className="start-button">Let's start now!</Link>
                            </div>
                            <div className="feature-right-one">
                                <img src={testImage} alt="Feature" className="feature-image-one"/>
                            </div>

                        </div>
                    </div>
                    <h1 className="title">Everything you need to know about Mentis.AI</h1>
                    <div className="container-two">
                        <div className="section-feature">
                            <Feature title="Weekly Mood Chart"
                                     description=
                                         "Gain insights into your mental
                                health and make informed decisions for your well-being."
                                     image={graphImage}/>
                        </div>
                        <div className="section-feature">
                            <Feature title="Music Recommendation"
                                     description=
                                         "Suggests songs based on
                                user preferences, mood, and listening history."
                                     image={musicImage}/>
                        </div>
                        <div className="section-feature">
                            <Feature title="Emotional Support"
                                     description=
                                         "Provides comforting and motivational
                                messages based on user input."
                                     image={emotionalImage}/>
                        </div>
                        <div className="section-feature">
                            <Feature title="Journaling Prompt"
                                     description=
                                         "Provides users with a safe space to
                                express their feelings."
                                     image={diaryImage}/>
                        </div>
                    </div>
                    <h1 className="title">Frequently Asked Questions</h1>

                    <div>
                        <div>
                            {faqs.map((faq) => (
                                <div className="faq-item" key={faq.id}>
                                    <button className="faq-question"
                                            onClick={() => setActiveQuestion(activeQuestion === faq.id ? null : faq.id)}>
                                        {faq.question}
                                        <span>{activeQuestion === faq.id ? <FaMinusCircle/> :
                                            <FaPlusCircle/>}</span>
                                    </button>
                                    <AnimatePresence>
                                        {activeQuestion === faq.id && (
                                            <motion.div

                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                            >
                                                <p></p>
                                                {faq.answer}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Box className="chatbot-icon" onClick={chatbot}>
                        <img src={ChatBotImage} alt="Chatbot Icon" className="chatbot-icon-image"/>
                    </Box>
                    <Box className="dashboard-icon" onClick={dashboard}>Dashboard</Box>
                </div>
            </Scrollbars>


        </div>
    );
}

export default Home;