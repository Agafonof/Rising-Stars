import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import Button from '../UI/components/Button';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { styles } from '../UI/style/styleAuthPage';

export default function AuthPage({ navigation }) {
  const openNextLogin = () => {
    navigation.navigate('LoginPage');
  };
  const openNextSignUp = () => {
    navigation.navigate('SignUpPage');
  };

  const status = useAppSelector((state) => state.fetching.status);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      {status === 'fetching' && (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
      <View style={styles.containerAuthPage}>
        <Text style={styles.textAuthPage}>
          Войдите в систему или создайте аккаунт
        </Text>
        <View style={styles.fixToText}>
          <Button
            handler={() => {
              openNextLogin();
            }}
            title={'Вход'}
          />

          <Button
            handler={() => {
              openNextSignUp();
            }}
            title={'Регистрация'}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
