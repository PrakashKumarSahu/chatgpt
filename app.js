const API_KEY = 'api yha paste karna'; // Replace this with your actual API key
const submitButton = document.querySelector('#submit');
const userInput = document.querySelector('#userInput');
const outputElement = document.querySelector('#output');
const chatHistory = document.querySelector('#chat-history');
const newChatButton = document.querySelector('#new-chat-btn');

// Function to handle fetching GPT responses
async function getMessage() {
    const message = userInput.value.trim();

    if (!message) {
        alert('Please enter a message!');
        return;
    }

    outputElement.innerHTML += `<p><strong>You:</strong> ${message}</p>`; // Display the user's message
    userInput.value = ''; // Clear input

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        outputElement.innerHTML += `<p><strong>PrakashGPT:</strong> ${reply}</p>`; // Display GPT reply
        outputElement.scrollTop = outputElement.scrollHeight; // Auto-scroll to bottom
    } catch (error) {
        console.error('Error fetching data:', error);
        outputElement.innerHTML += `<p style="color: red;">An error occurred. Please try again.</p>`;
    }
}

// Function to clear chat and start new conversation
function newChat() {
    outputElement.innerHTML = '';
    userInput.value = '';
}

// Event listeners
submitButton.addEventListener('click', getMessage);
newChatButton.addEventListener('click', newChat);
