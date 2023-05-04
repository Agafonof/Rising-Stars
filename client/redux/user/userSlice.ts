import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ChangeData, LoginForm, PlayerType } from '../../types/userTypes';




const initialState: PlayerType = {
  id: null,
  name: '',
  ingame: true,
  score: 0,
  img: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setName: (state, action: PayloadAction<PlayerType>) => {
      state.name = action.payload.name;
      state.id = action.payload.id;

    },
    setImage: (state, action: PayloadAction<PlayerType['img']>) => {
      state.img = action.payload;
    },
    resetScore: (state, action: PayloadAction) => {
      state.score = 0;
    },
    addScore: (state, action: PayloadAction<number>) => {
      state.score += action.payload;
    },
    logoutUser: (state) => {
      state.id = null;
      state.name = '';
      state.ingame = true;
      state.score = 0;
    },
    setNewname: (state, action: PayloadAction<ChangeData>) => {
      state.name = action.payload.newname
    }
  }
});

export const { setName, setImage, resetScore, addScore, logoutUser, setNewname } = userSlice.actions;

export default userSlice.reducer;
