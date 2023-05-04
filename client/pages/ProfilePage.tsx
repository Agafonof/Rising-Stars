import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { changeUserDataThunk } from '../redux/user/UserThunk';
import { styles } from '../UI/style/styleProfilePage';
import { setError } from '../redux/error/errorSlice';

export default function ProfilePage({ navigation }) {
  const [newname, setNewname] = useState<string>('');
  const [newpass, setNewpass] = useState<string>('');
  const [change, setChange] = useState<string>('');
  const [showPassword, setShowPassword] = useState(true);

  const user = useAppSelector((state) => state.user);
  const error = useAppSelector((state) => state.error);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user.id) {
  //     navigation.navigate('MainPage');
  //     setNewpass('');
  //     setNewname('');
  //     dispatch(setError({ error: '' }));
  //   }
  // }, [user]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeHandler = async () => {
    if (newname.length < 3) {
      setChange('Новый логин должен содержать не менее 3 символов');
      return;
    }
    if (newpass.length < 5) {
      setChange('Новый пароль должен содержать не менее 5 символов');
      return;
    }
    else {
      dispatch(setError({ error: '' }));
      dispatch(changeUserDataThunk({ newname, newpass }));
    } 
    }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Профиль {user.name}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNewname}
            value={newname}
            placeholder="Логин"
            placeholderTextColor="grey"
            onSubmitEditing={changeHandler}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setNewpass}
            value={newpass}
            placeholder="Пароль"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onSubmitEditing={changeHandler}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            changeHandler();
          }}
        >
          <Text style={styles.buttonText}>Сохранить изменения</Text>
        </TouchableOpacity>

        {error.error && <Text style={{ color: 'red' }}>{error.error}</Text>}
      </View>
    </SafeAreaView>
  );
}
