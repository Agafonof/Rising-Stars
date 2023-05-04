import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { styles } from '../UI/style/styleLoginPage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUserThunk } from '../redux/user/UserThunk';
import { setError } from '../redux/error/errorSlice';
import Input from '../UI/components/Input';
import Button from '../UI/components/Button';
import { MaterialIcons } from '@expo/vector-icons';

export default function LoginPage({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const user = useAppSelector((state) => state.user);
  const status = useAppSelector((state) => state.fetching.status);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.id) {
      navigation.navigate('MainPage');
      setPassword('');
      setName('');
      dispatch(setError({ error: '' }));
    }
  }, [user]);

  const logInHandler = () => {
    dispatch(setError({ error: '' }));
    dispatch(loginUserThunk({ name, password }));
  };

  return status === 'fetching' ? (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Авторизация</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Логин"
            placeholderTextColor="grey"
            onSubmitEditing={logInHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Пароль"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onSubmitEditing={logInHandler}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
        </View>
        <Button 
          handler={() => {
            logInHandler();
          }} title={'Войти'}
        />

        {error.error && <Text style={{ color: 'red' }}>{error.error}</Text>}

        <Text style={styles.text}>
          {'\n'}*Если вы забыли пароль, {'\n'}Вам никогда не восстановить
          аккаунт
        </Text>
      </View>
    </SafeAreaView>
  );
}
