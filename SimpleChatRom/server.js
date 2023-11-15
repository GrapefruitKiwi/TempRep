const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

const users = {}; // 保存连接的用户信息

const messages = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (username) => {
        users[socket.id] = username; // 将用户信息与 socket.id 绑定
        io.to(socket.id).emit('chat history', messages); // 发送历史消息给新连接的用户
        io.emit('user joined', username);
    });

    socket.on('message', (message) => {
        const username = users[socket.id];
        const data = { username, message }
        io.emit('chat message', data ); // 发送信息
        messages.push(data); //保存信息
    });

    socket.on('disconnect', () => {
        const username = users[socket.id];
        io.emit('user left', username);
        delete users[socket.id]; // 在用户断开连接时删除用户信息
        console.log('A user, '+ username +', disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});