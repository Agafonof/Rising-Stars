import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../UI/style/styleAuthPage';

export default function Button({ title, handler }): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.buttonAuthPage}
      onPress={() => {
        handler();
      }}
    >
      <Text style={styles.buttonTextAuthPage}>{title}</Text>
    </TouchableOpacity>
  );
}
