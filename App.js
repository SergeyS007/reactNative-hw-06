import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute } from "./router";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute(null);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ImageBackground
              style={styles.imageBG}
              source={require("./assets/photoBG.png")}
            >
              {routing}
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
