import React, { useEffect } from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
import { styles } from './styles';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import HelloPage from './pages/HelloPage';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import CreateGamePage from './pages/CreateGamePage';
import FindGamePage from './pages/FindGamePage';
import WaitingRoomPage from './pages/WaitingRoomPage';
import { Dimensions } from 'react-native';
import ProfilePage from './pages/ProfilePage';
import GamePage from './pages/GamePage';
import LoadPhotoPage from './pages/LoadPhotoPage';
import TakePhoto from './pages/TakePhoto';
import LoadLabraryPhoto from './pages/LoadLabraryPhoto';
const { width, height } = Dimensions.get('screen');

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const Stack = createStackNavigator();

export default function Navigate(): JSX.Element {
  return (
    <NavigationContainer theme={MyTheme}>
      <ImageBackground
        source={require('./assets/background2.png')}
        style={styles.backgroundImage}
      >
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'transparent' },
            headerTintColor: '#FF7777',
            headerTitleStyle: { fontWeight: 'bold' },
            headerShadowVisible: false,
            // cardStyle: {
            //   backgroundColor: 'transparent',
            // },
          }}
        >
          <Stack.Screen
            name="Start"
            component={HelloPage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="AuthPage"
            component={AuthPage}
            options={{
              title: 'Авторизация',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{
              title: 'Главная',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="CreateGamePage"
            component={CreateGamePage}
            options={{ title: '' }}
          />
          <Stack.Screen
            name="FindGamePage"
            component={FindGamePage}
            options={{ title: '' }}
          />

          <Stack.Screen
            name="WaitingRoomPage"
            component={WaitingRoomPage}
            options={{
              title: 'Комната ожидания',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="LoadPhotoPage"
            component={LoadPhotoPage}
            options={{
              title: '',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="TakePhoto"
            component={TakePhoto}
            options={{ title: 'Сделать фото' }}
          />
          <Stack.Screen
            name="LoadLabraryPhoto"
            component={LoadLabraryPhoto}
            options={{ title: 'Загрузить из галереи' }}
          />
          <Stack.Screen
            name="GamePage"
            component={GamePage}
            options={{
              title: '',
              headerLeft: null,
              gestureEnabled: false,
            }}
          />
        </Stack.Navigator>
      </ImageBackground>
    </NavigationContainer>
  );
}
