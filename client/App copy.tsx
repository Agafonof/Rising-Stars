import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

const fonts = () => SplashScreen.preventAutoHideAsync();

export default function App() {
  const [font, setFont] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "cm-bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
          "cm-regular": require("./assets/fonts/Comfortaa-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFont(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (setFont) {
      await SplashScreen.hideAsync();
    }
  }, [setFont]);

  if (!setFont) {
    return null;
  }

    return (
      <ImageBackground
        source={require("./assets/background2.png")}
        style={styles.background}
        onLayout={onLayoutRootView}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#000" />
          <View style={styles.header}>
            <Text style={{ fontFamily: "cm-bold", fontSize: 35, color: "#FF7777", }}>Rising Starz</Text>
          </View>
          <View style={styles.content}>
            <TextInput style={styles.input} 
            placeholder="Введи своё имя" 
            placeholderTextColor="grey"/>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={{ fontFamily: "cm-bold", fontSize: 15, color: "#FF7777", }}>Copyright © My App</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
    height: 40,
    borderWidth: 2,
    borderColor: "#FF7777",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "white",
    backgroundColor: "#414141",
  },
  button: {
    backgroundColor: "#6C6087",
    paddingVertical: 8,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF7777",
  },
  buttonText: {
    color: "#FF7777",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});









const CardList = () => {
  const renderCard = ({ item }) => (
    <View
      style={[
        styles.card,
        item.id === 1 && styles.firstCard,
        item.id === data.length && styles.lastCard,
      ]}
    >
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderCard}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
  },
  firstCard: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastCard: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
