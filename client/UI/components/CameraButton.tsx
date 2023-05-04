import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../style/styleLoadLabraryPhotoPage';

export default function CameraButton({
  title,
  onPress,
  icon,
  color = 'black',
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cameraButton}>
      <Entypo name={icon} size={28} color={color ? color : '#f1f1f1'} />
      <Text style={styles.cameraText}>{title}</Text>
    </TouchableOpacity>
  );
}
