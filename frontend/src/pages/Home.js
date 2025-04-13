import React, { useState } from "react"; 
import {Link,  useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Feature from "../Components/Feature";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { Box } from "@radix-ui/themes";
import "../styles/styles.css"; 

function Home() {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(null);
  const chatbot = () => {
    navigate("/chatbot");
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
        <Header />
        <div className="content">
          <h1 className="title">Mentis.AI</h1>
          <p className="subtitle">
            Discover a supportive space for your mental well-being. Join us in taking proactive steps towards a healthier mind.
          </p>
          <Link to="/signup" className="start-button">Let's start now!</Link>
          <Feature title = "Weekly Mood Chart" description = 
          "Our Weekly Mood Charts empower you to visualize your emotional patterns over time.Gain insights into your mental health and make informed decisions for your well-being."/>
          <Feature title = "Music Recommendation" description = 
          "Our Music Recommendation feature suggests songs based on user preferences, mood, and listening history."/>
          <Feature title = "Emotional Support" description = 
          "Our AI-Powered Support Chat provides comforting and motivational messages based on user input"/>
          <Feature title = "Journaling Prompt" description =
          "Our Journaling Prompt provides users with a safe space to express their feelings."/>
          
          <h1 className="title">Frequently Asked Questions</h1>
          <p className="subtitle">Everything you need to know about Mentis.AI</p>
          
          <div>
            <div>
              {faqs.map((faq) => (
                <div className="faq-item" key={faq.id}>
                  <button className="faq-question"  onClick={() => setActiveQuestion(activeQuestion === faq.id ? null : faq.id)}>
                  {faq.question}
                  <span>{activeQuestion === faq.id ? <FaMinusCircle /> : <FaPlusCircle />}</span>
                     </button>
                   <AnimatePresence>
                    {activeQuestion === faq.id && (
                      <motion.div

                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
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
          <Box className="chatbot-icon" onClick={chatbot}>AI chatbot</Box>
        </div>
      </Scrollbars>
    </div>
  );
}

export default Home;
