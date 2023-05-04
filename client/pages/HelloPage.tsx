import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles } from '../UI/style/styleHelloPage';

export default function HelloPage({ navigation }) {
  const loadScene = () => {
    navigation.navigate('AuthPage');
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={loadScene}>
        <Image source={require('../assets/123.png')} style={styles.image} />
        <Text style={styles.textHello}>Risin' StarS</Text>
        <StatusBar style="auto" />
      </TouchableOpacity>
    </View>
  );
}
