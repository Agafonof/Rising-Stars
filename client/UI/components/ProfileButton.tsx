import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../style/styleLoadLabraryPhotoPage';

export default function ProfileButton({
  title,
  onPress,
  icon,
  color = '#6C6087',
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.profileButton}>
      <Entypo name={icon} size={45} color={color ? color : '#6C6087'} />
    </TouchableOpacity>
  );
}
