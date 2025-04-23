import { io } from 'socket.io-client'

// DOM Elements
const chatContainer = document.getElementById('chatContainer');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');


const socket = io('http://localhost:3000');
socket.on('connect', () => {
    addMessage('System',`You connected with id: <strong>${socket.id}</strong>`, false);
})

socket.emit('customEvent', { message: 'Hello from client!' });

// Event Listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Functions
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) {
        return;
    }

    addMessage('You', message, true);
    messageInput.value = '';
}

function addMessage(sender, content, isSent = false) {

    socket.emit('sendMessage', { message: content });

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : ''}`;
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${content}`;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
