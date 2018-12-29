const express = require('express'),
  debug = require('debug')('app:heart'),
  socket = require('socket.io'),
  morgan = require('morgan'),
  app = express();

// Serve static folders
app.use(express.static(__dirname + '/public'));

// Middlewares
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
  debug('Morgan enabled...');
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => debug(`Server running on port ${PORT}`));

// Set up socket
const io = socket(server);

io.on('connection', socket => {
  debug('Made socket connection', socket.id);

  // Handle chat event
  socket.on('chat', data => {
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', data => {
    socket.broadcast.emit('typing', data);
  });
});
