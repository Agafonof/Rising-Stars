import axios from 'axios';

import { ThunkActionCreater } from '../store';
import {
  BackPlayerType,
  ChangeData,
  LoginForm,
  PlayerType,
} from '../../types/userTypes';
import { logoutUser, setName, setNewname } from './userSlice';
import { Platform } from 'react-native';
import { setError } from '../error/errorSlice';
import { setStatus } from '../fethcing/fetchingSlice';

export const loginUserThunk: ThunkActionCreater<LoginForm> =
  (formData) => (dispatch) => {
    dispatch(setStatus('fetching'));
    axios
      .post<PlayerType>(
        `http://${
          Platform.OS === 'android' ? '192.168.2.179' : 'localhost'
        }:3000/auth/login`,
        formData
      )
      .then(({ data }) => {
        dispatch(setName(data));
        dispatch(setStatus('logged'));
      })
      .catch(() => {
        dispatch(setError({ error: 'Неверный логин или пароль' }));
        dispatch(setStatus('guest'));
      });
  };

export const signupUserThunk: ThunkActionCreater<LoginForm> =
  (formData) => (dispatch) => {
    dispatch(setStatus('fetching'));
    axios
      .post<PlayerType>(
        `http://${
          Platform.OS === 'android' ? '192.168.2.179' : 'localhost'
        }:3000/auth/signup`,
        formData
      )
      .then(({ data }) => {
        dispatch(setName(data));
        dispatch(setStatus('logged'));
      })
      .catch(() => {
        dispatch(setError({ error: 'Логин уже используется' }));
        dispatch(setStatus('guest'));
      });
  };

export const logoutUserThunk: ThunkActionCreater = () => (dispatch) => {
  dispatch(setStatus('fetching'));
  axios(
    `http://${
      Platform.OS === 'android' ? '192.168.2.179' : 'localhost'
    }:3000/auth/logout`
  )
    .then(() => {
      dispatch(logoutUser());
      dispatch(setStatus('guest'));
    })
    .catch(() => {
      dispatch(setError({ error: 'Вам никогда не покинуть эту страницу :)' }));
      dispatch(setStatus('guest'));
    });
};

export const changeUserDataThunk: ThunkActionCreater<ChangeData> =
  (formData) => (dispatch) => {
    axios
      .patch<ChangeData>(
        `http://${
          Platform.OS === 'android' ? '192.168.2.179' : 'localhost'
        }:3000/profile`,
        formData
      )
      .then(() => dispatch(setNewname(formData)))
      .catch(() => dispatch(setError({ error: 'You can not log out :)' })));
  };
