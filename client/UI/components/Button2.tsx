import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../UI/style/styleAuthPage';

export default function Button2({ title }): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.buttonAuthPage}
    >
      <Text style={styles.buttonTextAuthPage}>{title}</Text>
    </TouchableOpacity>
  );
}
