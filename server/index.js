var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, { path: '/sockets' });
var path = require('path');

const port = process.env.NODE_ENV === 'development' ? 3030 : 4000;
const sysResTemplate = {
  uuid: 'system',
  username: 'SYS'
};

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.use('/static', express.static(path.resolve(__dirname, '../build', 'static')));

io.on('connection', function(socket) {
  socket.on('up', function(pkg) {
    const {
      uuid = '',
      type = 0,
      channel = '',
      username = '',
      playload = ''
    } = pkg;
    console.log('--->');
    console.log(`uuid: ${uuid}`);
    console.log(`type: ${type}`);
    console.log(`channel: ${channel}`);
    console.log(`username: ${username}`);
    console.log(`playload: ${playload}`);
    console.log('<---');
    if (!uuid || !channel || !username) {
      socket.disconnect();
      return;
    }
    if (!socket.rooms[channel]) {
      socket.join(channel);
    }
    const t = Number(type);
    switch (t) {
      case 1:
      case 3:
        io.to(channel).emit(
          'down',
          Object.assign({}, sysResTemplate, {
            type: t,
            channel,
            playload: {
              target: uuid,
              msg: `${username} ${t === 1 ? 'join' : 'leave'} this channel`
            }
          })
        );
        break;
      case 2:
        io.to(channel).emit('down', pkg);
        break;
      default:
        break;
    }
  });
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(port, function() {
  console.log(`listening on *:${port}`);
});
