import axios from 'axios';

async function testChatbotAPI() {
    const baseURL = 'http://localhost:3000/api';
    const userId = 1234; // Test user ID

    try {
        // Test POST endpoint
        console.log('Testing POST /chatbot/message...');
        const postResponse = await axios.post(`${baseURL}/chatbot/message`, {
            userId: userId,
            message: "I'm feeling really anxious about my upcoming exam"
        });

        console.log('POST Response:', postResponse.data);

        // Test GET endpoint
        console.log('\nTesting GET /chatbot/response...');
        const getResponse = await axios.get(`${baseURL}/chatbot/response`, {
            params: { userId: userId }
        });

        console.log('GET Response:', getResponse.data);

    } catch (error) {
        console.error('Error testing API:', error.response?.data || error.message);
    }
}

testChatbotAPI(); 