const socket = io();

function login() {
  const username = document.getElementById('username').value;
  socket.emit('join', username);
  document.getElementById('login').style.display = 'none';
  document.getElementById('chat').style.display = 'block';
}

function sendMessage() {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
  document.getElementById('message').value = '';
}

socket.on('chat message', (data) => {
  const { username, message } = data;
  const messages = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${username}: ${message}`));
  messages.appendChild(li);
});

socket.on('user joined', (username) => {
  const messages = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${username} joined the chat`));
  messages.appendChild(li);
});

socket.on('user left', (username) => {
  const messages = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(`${username} left the chat`));
  messages.appendChild(li);
});

socket.on('chat history', (history) => {
  const messages = document.getElementById('messages');
  history.forEach((data) => {
    const { username, message } = data;
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${username}: ${message}`));
    messages.appendChild(li);
  });
});
