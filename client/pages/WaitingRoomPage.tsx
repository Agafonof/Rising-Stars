import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { styles } from '../UI/style/styleWaitingRoomPage';
import {
  deleteRoomAction,
  exitRoomAction,
  leaveRoomAction,
} from '../redux/room/roomAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { PlayerType } from '../types/userTypes';
import Button2 from '../UI/components/Button2';
import Button from '../UI/components/Button';
import { updateGameStatus } from '../redux/game/gameSlice';
import { startGameAction } from '../redux/game/gameAction';

export default function WaitingRoomPage({ navigation }) {
  const [changeStatus, setChangeStatus] = useState(false);
  const { allPlayers, roomPin, status } = useAppSelector((state) => state.game);
  const user = useAppSelector((state) => state.user);
  const creatorId = useAppSelector((state) => state.game.userid);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'ChoosePicture') {
      navigation.navigate('LoadPhotoPage');
    }
  }, [status]);

  useEffect(() => {
    dispatch(updateGameStatus('PlayerFind'));
    setChangeStatus(true);
  }, []);

  useEffect(() => {
    if (changeStatus === true) {
      if (status === null) {
        navigation.navigate('MainPage');
      }
    }
  }, [status]);

  return (
    // <SafeAreaView>
      // <ScrollView contentContainerStyle={styles.scrollView}>

        <View style={styles.container}>
          <Text style={styles.text}>{`Участники ${allPlayers.length} / 8`}</Text>

          <FlatList
            style={styles.list}
            data={allPlayers?.map((elem: PlayerType) => ({ 
              key: elem.name,
            }))}
            renderItem={({ item }) => <Button2 title={item.key}></Button2>}
          />
          {user.id === creatorId ? (
            <>
              <Button
                title="Начать игру"
                handler={() => {
                  dispatch(startGameAction('ChoosePicture'));
                }}
              />
              <Button
                title="Удалить комнату"
                handler={() => {
                  dispatch(leaveRoomAction());
                  dispatch(deleteRoomAction(roomPin));
                }}
              />
            </>
          ) : (
            <Button
              title="Покинуть комнату"
              handler={() => {
                dispatch(exitRoomAction(user.id));
                navigation.navigate('MainPage');
              }}
            />
          )}
          <StatusBar style="auto" />
        </View>
      // </ScrollView>
    // </SafeAreaView>
  );
}
