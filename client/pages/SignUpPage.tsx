import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { styles } from '../UI/style/styleSignupPage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { signupUserThunk } from '../redux/user/UserThunk';
import { setError } from '../redux/error/errorSlice';
import Input from '../UI/components/Input';
import Button from '../UI/components/Button';

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [tip, setTip] = useState<string>('');
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

  const signUpHandler = async () => {
    if (name.length < 3) {
      setTip('Логин должен содержать не менее 3 символов');
      return;
    }
    if (password.length < 5) {
      setTip('Пароль должен содержать не менее 5 символов');
      return;
    } else {
      dispatch(setError({ error: '' }));
      dispatch(signupUserThunk({ name, password }));
    }
  };

  return status === 'fetching' ? (
    <View style={styles.spinnerView}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Регистрация</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Login"
            placeholderTextColor="grey"
            onSubmitEditing={signUpHandler}
            autoComplete="name"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            textContentType="password"
            placeholder="Password"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onSubmitEditing={signUpHandler}
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
        {tip && <Text style={{ color: 'red' }}>{tip}</Text>}
        {/* 
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setTip('');
          signUpHandler();
        }}
      >
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity> */}
        <Button
          handler={() => {
            setTip('');
            signUpHandler();
          }}
          title={'Войти'}
        />

        {error.error && <Text style={{ color: 'red' }}>{error.error}</Text>}
      </View>
    </SafeAreaView>
  );
}
