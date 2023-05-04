import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
  Modal,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAllRooms, joinGameAction } from '../redux/room/roomAction';
import { RoomType } from '../types/gameTypes';
import { styles } from '../UI/style/styleFindGamePage';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import Button from '../UI/components/Button';
import Button3 from '../UI/components/Button3';

export default function FindGamePage({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState<string>('');
  const [tip, setTip] = useState<string>('');
  const [currentRoom, setCurrentRoom] = useState<string>('');

  const dispatch = useAppDispatch();
  const allRooms = useAppSelector((state) => state.room.allRooms);
  const user = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  const connectRoom = ({ roomPin, user }) => {
    if (currentRoom !== roomPin) {
      return setTip('Неверный пароль');
    }

    dispatch(joinGameAction({ roomPin, user }));
    setTip('');
    setModalVisible(false);
    navigation.navigate('WaitingRoomPage');
  };

  return (
    <SafeAreaView>
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
        <View style={styles.container}>
          <Text style={styles.text}>Список комнат</Text>
          <StatusBar style="auto" />

          {allRooms.length > 0 ? (
            <FlatList
              style={styles.list}
              data={allRooms.map((elem: RoomType) => ({
                key: elem.User?.name,
                pin: elem.pin,
              }))}
              renderItem={({ item }) => (
                <Button
                  handler={() => {
                    setModalVisible(true);
                    setCurrentRoom(item.pin);
                  }}
                  title={`Комната\n${item.key}`}
                />
              )}
            />
          ) : (
            <Text style={styles.text}>
              В данный момент нет существующих комнат
            </Text>
          )}
        </View>

        <Modal
          style={styles.modal}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <KeyboardAvoidingView style={styles.centeredView} behavior="padding">
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Введите пароль</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                placeholder="Password"
                secureTextEntry={true}
                keyboardType={
                  Platform.OS === 'android' ? 'numeric' : 'number-pad'
                }
                // onSubmitEditing={signUpHandler}
              />
              {tip && <Text style={{ color: 'red' }}>{tip}</Text>}

              <Button3
                handler={() => {
                  setTip('');
                  connectRoom({ roomPin: password, user });
                }}
                title={'Подключиться'}
              />
              <Button3
                handler={() => {
                  setModalVisible(false);
                  setPassword('');
                  setTip('');
                  setCurrentRoom('');
                }}
                title={'Отмена'}
              />
            </View>
          </KeyboardAvoidingView>
        </Modal>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
