import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../style/styleLoadLabraryPhotoPage';

export default function ExitButton({
  title,
  onPress,
  icon,
  color = '#FF7777',
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.exitButton}>
      <Entypo name={icon} size={45} color={color ? color : '#6C6087'} />
    </TouchableOpacity>
  );
}
