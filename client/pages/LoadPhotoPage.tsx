import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';
import { styles } from '../UI/style/styleLoadPhotoPage';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Button3 from '../UI/components/Button3';
import {startGameAction} from '../redux/game/gameAction'

export default function LoadPhotoPage({ navigation }) {
  const [photoReady, setPhotoReady] = useState(false);
  const user = useAppSelector((state) => state.user);
  const allPlayers = useAppSelector((state) => state.game.allPlayers);

  useEffect(() => {
    if (allPlayers.every((el) => el.img !== '')) {
      dispatch(startGameAction('InProcess'))
      navigation.navigate('GamePage');
    }
  }, [allPlayers]);

  useEffect(() => {
    if (user.img) {
      setPhotoReady(true);
    }
  }, [user]);

  const dispatch = useAppDispatch();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {photoReady ? (
          <>
            <Text style={styles.text}>Ожидание игроков...</Text>
          </>
        ) : (
          <>
            <Text style={styles.text}>Добавление фото</Text>
            <Button3
              title="Загрузить"
              handler={() => {
                navigation.navigate('LoadLabraryPhoto');
              }}
            />
            <Button3
              title="Сделать снимок"
              handler={() => navigation.navigate('TakePhoto')}
            />
            <StatusBar style="auto" />
          </>
        )}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
