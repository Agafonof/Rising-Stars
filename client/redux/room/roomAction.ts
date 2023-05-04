

// Action creators
export const createRoomAction = (payload) => ({
  type: 'CREATE_ROOM',
  payload,
});

export const findRoomAction = () => ({
  type: 'FIND_ROOM',
})

export const getAllRooms = () => ({
  type: 'GET_ALL_ROOMS'
})

export const joinGameAction = (payload) => ({
  type: 'JOIN_ROOM',
  payload
})

export const deleteRoomAction = (payload) => ({
  type: 'DELETE_ROOM',
  payload
})

export const leaveRoomAction = () => ({
  type: 'LEAVE_ROOM',

})


export const exitRoomAction = (payload) => ({
  type: 'EXIT_ROOM',
  payload
})



