import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './game/gameSlice';
import wsReducer from './websocket/wsReducer';
import roomSlice from './room/roomSlice';
import userSlice from './user/userSlice';
import errorSlice from './error/errorSlice';
import fetchingSlice from './fethcing/fetchingSlice';
import questionSlice  from './questions/questionsSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    questions: questionSlice,
    user: userSlice,
    game: gameSlice,
    ws: wsReducer,
    room: roomSlice,
    error: errorSlice,
    fetching: fetchingSlice,
  },
  middleware: (mid) => [...mid(), sagaMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;

export type ThunkActionCreater<PayloadType = void, ReturnType = void> = (
  payload: PayloadType,
) => AppThunk<ReturnType>;

sagaMiddleware.run(rootSaga);

export default store;
