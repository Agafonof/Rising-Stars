import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../../UI/style/styleLoadPhotoPage';

export default function Button3({ title, handler }): JSX.Element {
  return (
    <TouchableOpacity
      style={styles.buttonLoad}
      onPress={() => {
        handler();
      }}
    >
      <Text style={styles.buttonTextLoad}>{title}</Text>
    </TouchableOpacity>
  );
}
