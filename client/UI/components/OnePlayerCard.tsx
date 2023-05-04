import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import type { PlayerType } from '../../types/userTypes';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ButtonVote from './ButtonVote';
import { styles } from '../style/styleGamePage';


type OnePlayerCardProps = {
  player: PlayerType;
  setScore: (player: PlayerType) => void;
  clicked: boolean;
};

function OnePlayerCard({
  player,
  setScore,
  clicked,
}: OnePlayerCardProps): JSX.Element {
  const [chosen, setChosen] = useState<boolean>(false);
  const [updatePlayer, setUpdatePlayer] = useState<PlayerType>(player);

  const { allPlayers } = useAppSelector((state) => state.game);
  const total = allPlayers?.reduce((acc, el) => acc + el.score, 0);


  const current = allPlayers.find((user) => user.id === player.id);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: "data:image/png;base64," + player.img }}
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.text}>{player.name}</Text>
      <Text style={styles.text1}>{`${current.score} голос(-ов)`}</Text>
      <ButtonVote
        title="Голосовать"
        disabled={clicked}
        handler={() => {
          setScore(current);
          setChosen(true);
        }}
      />
    </View>
  );
}

export default React.memo(OnePlayerCard)