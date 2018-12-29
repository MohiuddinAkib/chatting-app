// Make connection
const socket = io.connect('http://localhost:8000');

// Query DOM
const message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

message.disabled = true;

// Emit event
btn.addEventListener('click', sendChatMessage);
message.addEventListener('keypress', broadcastHandler);
handle.addEventListener('keyup', e => {
  if (e.target.value.length > 0) {
    message.disabled = false;
  } else {
    message.disabled = true;
    message.value = '';
  }
});

function sendChatMessage() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
  message.value = '';
}

function broadcastHandler() {
  socket.emit('typing', handle.value);
}

// Listen for socket events
socket.on('chat', data => {
  output.innerHTML +=
    '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  feedback.innerHTML = '';
});

socket.on(
  'typing',
  data =>
    (feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`)
);
