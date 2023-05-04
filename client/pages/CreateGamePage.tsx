import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { createRoomAction } from '../redux/room/roomAction';
import { styles } from '../UI/style/styleCreateGamePage';
import { setupRoom } from '../redux/game/gameSlice';
import Button from '../UI/components/Button';

export default function CreateGamePage({ navigation }) {
  const [pin, setPin] = useState<string>('');
  const user = useAppSelector((state) => state.user);

  // const inputHandler = (e: any): void => {
  //   setPin(e.target.value)
  // }
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>Создание новой игры</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.inputCreate}
          onChangeText={setPin}
          value={pin}
          placeholder="Придумайте ПИН"
          placeholderTextColor="grey"
          secureTextEntry={true}
        />
        <Button
          handler={() => {
            dispatch(createRoomAction({ pin, user }));
            dispatch(setupRoom({roomPin: pin, userid: user.id }));
            navigation.navigate('WaitingRoomPage');
          }}
          title="Создать комнату"
        />
      </View>
    </SafeAreaView>
  );
}
