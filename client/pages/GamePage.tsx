import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import OnePlayerCard from '../UI/components/OnePlayerCard';
import {
  getQuestionsAction,
  newRoundAction,
  voteAction,
} from '../redux/game/gameAction';
import { PlayerType } from '../types/userTypes';
import { styles } from '../UI/style/styleGamePage';
import { deleteRoomAction, leaveRoomAction } from '../redux/room/roomAction';

export default function GamePage({navigation}) {
  // state игроков в комнате !
  const allPlayers = useAppSelector((state) => state.game.allPlayers);
  // state вопросов в комнате !
  const round = useAppSelector((state) => state.game.round);
  // state статуса игры ?
  const gameStatus = useAppSelector((state) => state.game.status);
  const dispatch = useAppDispatch();

  const roomPin = useAppSelector((state) => state.game.roomPin);

  const text = useAppSelector((state) => state.questions.text);

  const [winnterText, setWinnerText] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getQuestionsAction());
  }, []);
  const [currentRound, setCurrentRound] = useState<number>(1);

  const [playersInGame, setPlayersInGame] = useState<PlayerType[]>(allPlayers);

  const [clicked, setClicked] = useState(false);

  const setScore = (player) => {
    const userEdited = { ...player };
    userEdited.score += 1;
    setPlayersInGame((prev) =>
      prev.map((el) => (el.id === userEdited.id ? userEdited : el))
    );
    // dispatch(updatePlayers(userEdited))
    dispatch(voteAction(userEdited));
    setClicked(!clicked);
  };

  const total = allPlayers?.reduce((acc, el) => acc + el.score, 0);

  const endGame = () => {
    setTimeout(() => {
      dispatch(leaveRoomAction());
      dispatch(deleteRoomAction(roomPin));
      navigation.navigate('MainPage')
    }, 5000);
  };

  useEffect(() => {
    console.log('==========total ==========', total);
    allPlayers.map((el) => console.log(el.name, ' ==========', el.score));

    if (total === allPlayers.length) {
      const updatePlayers = allPlayers.map((el) => ({ ...el, score: 0 }));
      console.log('Round:', round, '<====================');

      setClicked(false);

      const numList = allPlayers.map((el) => el.score);
      const min = Math.min(...numList);
      const minPlayerIndex = allPlayers.findIndex((el) => el.score === min);

      setPlayersInGame((prev) =>
        prev.filter((el, index) => index !== minPlayerIndex)
      );
      if (playersInGame.length-1 === 1) {
        setWinnerText(true);
        console.log('Yeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaah, bitches')
        return endGame();
      }

      if (playersInGame.length-1 > 1) {
       
        dispatch(getQuestionsAction());
        dispatch(newRoundAction(updatePlayers));
      }
    }
  }, [allPlayers]);

  console.log(text);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {winnterText ? (
          <>
            <View style={styles.header}>
              <Text style={styles.text}>И перед Вами победитель!</Text>
            </View>
            <View>
              <Image
                source={{ uri: "data:image/png;base64," + playersInGame[0].img }}
                style={{ width: 200, height: 200 }}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.text}>{text.text}</Text>
            </View>
            <View>
              {playersInGame.map((player) => (
                <OnePlayerCard
                  key={player.id}
                  player={player}
                  setScore={setScore}
                  clicked={clicked}
                />
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
