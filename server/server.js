const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const authRouter = require('./routers/authRouter');
const { pathMiddleware } = require('./middlewares');
const wss = require('./webSocket');
const roomRouter = require('./routers/roomRouter');
const profileRouter = require('./routers/profileRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


const sessionParser = session({
  name: 'sid_socket',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
});

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(pathMiddleware);
app.use(sessionParser);
app.use('/auth', authRouter);
app.use('/room', roomRouter);

app.use('/profile', profileRouter);

const server = http.createServer(app);

const map = new Map();


server.on('upgrade', (request, socket, head) => {
  console.log('Parsing session from request...');
  
  sessionParser(request, {}, () => {
    if (!request.session.user) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }
    
    console.log('Session is parsed!');
    
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request, map);
    });
  });
});



server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));