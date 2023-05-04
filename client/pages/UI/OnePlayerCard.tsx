import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import type { PlayerType } from '../../types/userTypes';
import ButtonVote from '../../UI/components/ButtonVote';
import { styles } from '../../UI/style/styleGamePage';

type OnePlayerCardProps = {
  player: PlayerType;
  setScore: (player: PlayerType) => void;
  clicked: boolean;
};

export default function OnePlayerCard({
  player,
  setScore,
  clicked,
}: OnePlayerCardProps): JSX.Element {
  const [chosen, setChosen] = useState<boolean>(false);

  const { allPlayers } = useAppSelector((state) => state.game);
  const total = allPlayers?.reduce((acc, el) => acc + el.score, 0);

  const current = allPlayers.find((user) => user.id === player.id);
  return (
    <View>
      <Image
        source={{ uri: 'data:image/png;base64,' + player.img }}
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.text}>{player.name}</Text>
      <Text>{`${current.score} голос(-ов)`}</Text>
      <ButtonVote
        title={'Голосовать'}
        handler={() => {
          setScore(current);
          setChosen(true);
        }}
        disabled={clicked}
      />
    </View>
  );
}
