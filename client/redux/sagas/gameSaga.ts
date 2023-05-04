import { take, put, call, takeEvery, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { SET_WS, SOCKET_INIT, UPDATE_STATUS } from '../../types/webSocket';
import { Platform } from 'react-native';

function createSocketChannel(socket, action) {
  return eventChannel((emit) => {
    socket.onopen = () => {
      console.log('action --->', action?.type);
      emit({ type: SET_WS, payload: true });
    };

    socket.onerror = function (error) {
      emit({ type: SET_WS, payload: null });
    };

    socket.onmessage = function (event) {
      // console.log('message --->>', JSON.parse(event.data));
      emit(JSON.parse(event.data)); // тут прилетает message с бекенда, и мы его сразу же диспатчим
    };

    socket.onclose = function (event) {
      emit({ type: SET_WS, payload: null });
    };

    return () => {
      console.log('Socket off');
      emit(END);
    };
  });
}

function createWebSocketConnection() {
  const newSocket = new WebSocket(
    `ws://${Platform.OS === 'android' ? '192.168.2.179' : 'localhost'}:3000`
  ); //process.env.REACT_APP_WSURL); // ws://localhost:3000
  console.log('Created WS:', newSocket);
  return newSocket;
}

function* updateStatus(socket) {
  while (true) {
    const message = yield take(UPDATE_STATUS);
    socket.send(JSON.stringify(message));
  }
}

function* createRoom(socket) {
  while (true) {
    const message = yield take('FIND_ROOM');
    socket.send(JSON.stringify(message));
  }
}

function* joinGameWorker(socket) {
  while (true) {
    const message = yield take('JOIN_ROOM');
    socket.send(JSON.stringify(message));
  }
}

function* leaveGameWorker(socket) {
  while (true) {
    const message = yield take('LEAVE_ROOM');
    socket.send(JSON.stringify(message));
  }
}

function* loadPictureWorker(socket) {
  while (true) {
    const message = yield take('LOAD_PHOTO');
    socket.send(JSON.stringify(message));
  }
}

function* exitRoomWorker(socket) {
  while (true) {
    const message = yield take('EXIT_ROOM');
    socket.send(JSON.stringify(message));
  }
}

function* moveMade(socket) {
  while (true) {
    const message = yield take('MOVE_MADE');
    socket.send(JSON.stringify(message));
  }
}

function* getAllRoomsWorker(socket) {
  while (true) {
    const message = yield take('GET_ALL_ROOMS');
    socket.send(JSON.stringify(message));
  }
}
function* startGameWorker(socket) {
  while (true) {
    const message = yield take('START_GAME');
    socket.send(JSON.stringify(message));
  }
}

function* newRoundWorker(socket) {
  while (true) {
    const message = yield take('NEW_ROUND');
    socket.send(JSON.stringify(message));
  }
}

function* getQuestionsWorker(socket) {
  while (true) {
    const message = yield take('GET_QUESTIONS');
    socket.send(JSON.stringify(message));
  }
}




function* createRoomWorker(socket) {
  while (true) {
    const message = yield take('CREATE_ROOM');
    socket.send(JSON.stringify(message));
  }
}
function* voteWorker(socket) {
  while (true) {
    const message = yield take('VOTE');
    socket.send(JSON.stringify(message));
  }
}

function* deleteRoomWorker(socket) {
  while (true) {
    const message = yield take('DELETE_ROOM');
    socket.send(JSON.stringify(message));
  }
}

function* closeConnection(socket) {
  const message = yield take('CLOSE_WEBSOCKET');
  // socket.send(JSON.stringify(message));
  socket.close();
  yield put({ type: SET_WS, payload: null });
}

function* gameWorker(action) {
  const socket = yield call(createWebSocketConnection);
  const socketChannel = yield call(createSocketChannel, socket, action);

  yield fork(updateStatus, socket); // слушаем соединение с бэком
  yield fork(closeConnection, socket); // слушаем соединение с бэком
  yield fork(joinGameWorker, socket);
  yield fork(moveMade, socket);
  yield fork(createRoom, socket);
  yield fork(getAllRoomsWorker, socket);
  yield fork(createRoomWorker, socket);
  yield fork(deleteRoomWorker, socket);
  yield fork(leaveGameWorker, socket);
  yield fork(loadPictureWorker, socket);
  yield fork(exitRoomWorker, socket);
  yield fork(startGameWorker, socket);
  yield fork(newRoundWorker, socket);
   yield fork(getQuestionsWorker, socket);
  yield fork(voteWorker, socket);

  while (true) {
    try {
      const backAction = yield take(socketChannel);
      yield put(backAction);
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

export default function* initWebSocketWatcher() {
  yield takeEvery(SOCKET_INIT, gameWorker);
}
