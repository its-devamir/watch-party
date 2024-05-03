const videoPlayer = document.getElementById('videoPlayer');
const messages = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');

// Detect the protocol used to load the page and adjust WebSocket protocol accordingly
const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const ws = new WebSocket(`${wsProtocol}//${window.location.host}`);

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
