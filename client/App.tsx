import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import MainStack from './navigate';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import store from './redux/store';
import { socketInit } from './redux/websocket/wsActions';
import axios from 'axios';


axios.defaults.withCredentials = true;

export default function App() {

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
}
