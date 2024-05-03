const videoPlayer = document.getElementById('videoPlayer');
const messages = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');

// Initialize WebSocket connection
const ws = new WebSocket(`ws://${window.location.host}`);

ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data.message) {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = data.message;
        messages.appendChild(msgDiv);
    }
};

function loadVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    videoPlayer.src = videoUrl;
}

function sendMessage() {
    const message = chatInput.value;
    ws.send(JSON.stringify({ message }));
    chatInput.value = '';
}
