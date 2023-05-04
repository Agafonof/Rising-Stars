import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { GameStateType, RoomSliceType, RoomType } from '../../types/gameTypes';
import { PlayerType } from '../../types/userTypes';



const initialState: RoomSliceType = {

    allRooms: [],



};

export const roomSlice = createSlice({
    name: 'Room',
    initialState: initialState,
    reducers: {
        setRoomsList: (state, action: PayloadAction<RoomType[]>) => {
            state.allRooms = action.payload
        },
        updateRoomsList: (state, action: PayloadAction<RoomType>) => {
            
            state.allRooms = [...state.allRooms, action.payload]
        },
        deleteRoom: (state, action: PayloadAction<string>) => {
            state.allRooms = state.allRooms.filter(room => room.pin !== action.payload)
        }




    },
});

export const { updateRoomsList, setRoomsList, deleteRoom } = roomSlice.actions;

export default roomSlice.reducer;