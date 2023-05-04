const { WebSocketServer } = require('ws');
const { User, Room, Game, Question } = require('../db/models');

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

wss.on('connection', (ws, request, wsMap) => {
  const { id } = request.session.user;
  wsMap.set(id, { ws, user: request.session.user });

  // for (const [, wsClient] of wsMap) {
  //   wsClient.ws.send(
  //     JSON.stringify({
  //       type: 'Game/setPlayerList',
  //       payload: Array.from(wsMap.values()).map((el) => el.user),
  //     })
  //   );
  // }

  ws.on('message', async (data) => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
      // case 'UPDATE_STATUS': {
      //   const user = await User.findByPk(id);
      //   user.status = payload.status;
      //   await user.save();
      //   wsMap.set(id, { ws, user });

      //   for (const [, wsClient] of wsMap) {
      //     wsClient.ws.send(
      //       JSON.stringify({
      //         type: 'friends/setFriendsOnline',
      //         payload: Array.from(wsMap.values()).map((el) => el.user),
      //       })
      //     );
      //   }
      //   break;
      // }
      case 'GET_ALL_ROOMS': {
        const allRooms = await Room.findAll({ include: User });

        wsMap
          .get(id)
          .ws.send(
            JSON.stringify({ type: 'Room/setRoomsList', payload: allRooms })
          );
        break;
      }

      case 'GET_QUESTIONS': {
        const allquestions = await Question.findAll();

        const question = allquestions[Math.floor(Math.random() * allquestions.length)];

        wsMap.get(id).ws.send(
          JSON.stringify({ type: 'question/setQuestion', payload: question })
        );
        break;




      }

      case 'JOIN_ROOM': {
        const { roomPin, user } = payload;
        const foundRoom = await Room.findOne({ where: { pin: roomPin } });
        if (!foundRoom) {
          console.log('failed');
          return;
        }

        await Game.create({ userid: user.id, roomid: foundRoom.id });
        const gameUsers = await Game.findAll({
          where: { roomid: foundRoom.id },
          include: User,
        });

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/addPlayers', payload: user })
          );
        }

        break;
      }

      case 'LEAVE_ROOM': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({ type: 'Game/resetRoom' }));
        }

        break;
      }

      case 'VOTE': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/updatePlayers', payload })
          );
        }

        break;
      }

      case 'NEW_ROUND': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(JSON.stringify({ type: 'Game/nextRound' }));
        }

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/setPlayerList', payload })
          );
        }

        break;


      }

      case 'EXIT_ROOM': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/playerExit', payload })
          );
        }

        break;
      }

      case 'LOAD_PHOTO': {
        const user = payload;
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/updatePlayers', payload: user })
          );
        }

        break;
      }

      case 'START_GAME': {
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({ type: 'Game/updateGameStatus', payload })
          );
        }

        break;
      }

      case 'CREATE_ROOM': {
        const { pin, user } = payload; // создать комнату и иниицатора добавить в эту комнату

        // всем по вебсокетам разослать инфу о новой комнате. Диспатч setAllRooms -> [...]

        const room = await Room.create({ pin, userid: user.id });
        await Game.create({ userid: user.id, roomid: room.id });
        const oneRoom = await Room.findOne({
          where: { userid: user.id },
          include: User,
        });
        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'Room/updateRoomsList',
              payload: oneRoom,
            })
          );
        }

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'Game/addPlayers',
              payload: user,
            })
          );
        }

        break;
      }

      case 'DELETE_ROOM': {
        const roomPin = payload;
        try {
          await Room.destroy({ where: { pin: roomPin } });
        } catch (error) {
          console.log(error);
        }

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'Room/deleteRoom',
              payload: roomPin,
            })
          );
        }

        for (const [, wsClient] of wsMap) {
          wsClient.ws.send(
            JSON.stringify({
              type: 'Game/resetRoom',
            })
          );
        }
        break;
      }

      case 'UPLOAD_PHOTO': {
        const { roomId } = payload; // если тот, кто отправил фотку является последним отправившим в комнате, тогда

        // всем в этой комнате высылаем экщн startGame() -> gameStatus: 'inGame'

        break;
      }

      default:
        break;
    }
  });

  ws.on('error', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        })
      );
    }
  });

  ws.on('close', () => {
    wsMap.delete(id);
    for (const [, wsClient] of wsMap) {
      wsClient.ws.send(
        JSON.stringify({
          type: 'friends/setFriendsOnline',
          payload: Array.from(wsMap.values()).map((el) => el.user),
        })
      );
    }
  });
});

module.exports = wss;
