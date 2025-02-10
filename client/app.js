document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
    const ws = new WebSocket(`ws://localhost:8080/?room=${room}`);
    const chatBox = document.getElementById('chat-box');
    const messageForm = document.getElementById('message-form');

    ws.onopen = () => {
        console.log('Connected to the server');
    };

    ws.onmessage = (event) => {
        const message = document.createElement('div');
        message.textContent = event.data;
        chatBox.appendChild(message);
    };

    ws.onclose = () => {
        console.log('Disconnected from the server');
    };

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageInput = document.getElementById('message');
        ws.send(messageInput.value);
        messageInput.value = '';
    });
});
