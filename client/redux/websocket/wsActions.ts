const { SET_WS, SOCKET_INIT } = require('../../types/webSocket');

export const setWs = (payload) => ({ type: SET_WS, payload });
export const socketInit = () => ({ type: SOCKET_INIT });
