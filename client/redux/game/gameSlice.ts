import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { GameStateType } from '../../types/gameTypes';
import { PlayerType } from '../../types/userTypes';

const initialState: GameStateType = {
  status: null,
  roomPin: null,
  allPlayers: [],
  round: 0,
  userid: null
};

export const gameSlice = createSlice({
  name: 'Game',
  initialState: initialState,
  reducers: {
    setPlayerList: (state, action: PayloadAction<PlayerType[]>) => {
      state.allPlayers = action.payload;
    },

    addPlayers: (state, action: PayloadAction<PlayerType>) => {
      state.allPlayers.push(action.payload);
    },

    playerExit: (state, action: PayloadAction<PlayerType['id']>) => {
      state.allPlayers = state.allPlayers.filter((elem) => elem.id !== action.payload);
    },


    updatePlayers: (state, action: PayloadAction<PlayerType>) => {

      state.allPlayers = state.allPlayers.map((elem) => elem.id === action.payload.id ? action.payload : elem)
    },


    updateGameStatus: (state, action: PayloadAction<GameStateType['status']>) => {
      state.status = action.payload;
    },


    setupRoom: (state, action: PayloadAction<{roomPin: string, userid: number}>) => {
      state.roomPin = action.payload.roomPin;
      state.userid = action.payload.userid;
    },
    nextRound: (state) => {
      state.round += 1;
    },
    resetRoom: (state) => {
      state.status = null;
      state.roomPin = null;
      state.allPlayers = [];
      state.round = 0;
      state.userid = null;
    }
  },
});

export const { setupRoom, nextRound, setPlayerList, updateGameStatus, resetRoom, updatePlayers } = gameSlice.actions;

export default gameSlice.reducer;
