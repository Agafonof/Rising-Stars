import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { styles } from '../UI/style/styleMainPage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { socketInit } from '../redux/websocket/wsActions';
import { logoutUserThunk } from '../redux/user/UserThunk';
import { setError } from '../redux/error/errorSlice';
import Button from '../UI/components/Button';

import ProfileButton from '../UI/components/ProfileButton';
import ExitButton from '../UI/components/ExitButton';

export default function MainPage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [tip, setTip] = useState<string>('');

  const error = useAppSelector((state) => state.error);
  const status = useAppSelector((state) => state.fetching.status);
  const gameStatus = useAppSelector((state) => state.game.status);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(socketInit());
  }, []);

  useEffect(() => {
    if (user.img) {
      console.log(
        '============================= Main navigation ============================='
      );
      navigation.navigate('LoadPhotoPage');
    }
  }, [user.img]);

  useEffect(() => {
    if (!user.id) {
      navigation.navigate('AuthPage');
      dispatch(setError({ error: '' }));
    }
  }, [user.id]);

  const findGameHandler = () => navigation.navigate('FindGamePage');

  const logout = () => {
    dispatch(setError({ error: '' }));
    dispatch(logoutUserThunk());
  };
  return status === 'fetching' ? (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <ProfileButton
            title={''}
            icon="user"
            onPress={() => navigation.navigate('ProfilePage')}
          />
          <View style={styles.leftContainer}>
            <Text style={styles.textProf}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.exitContainer}>
          <ExitButton title={''} icon="log-out" onPress={logout} />
        </View>

      </View>

      <View>
        <Button
          handler={() => navigation.navigate('CreateGamePage')}
          title={'Создать свою игру'}
        />
        <Button handler={() => findGameHandler()} title={'Найти игру'} />

        {error.error && <Text style={{ color: 'red' }}>{error.error}</Text>}

        {/* <TouchableOpacity
          style={styles.buttonMainPage}
          onPress={() => navigation.navigate('ProfilePage')}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
}
