import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../UI/style/styleAuthPage';

export default function ButtonVote({ title, handler, disabled }): JSX.Element {

  return (
    <TouchableOpacity
      style={styles.buttonAuthPage}
      onPress={() => {
        handler()
      }}
      disabled ={disabled}
    >
      <Text style={styles.buttonTextAuthPage}>{title}</Text>
    </TouchableOpacity>
  );
}
