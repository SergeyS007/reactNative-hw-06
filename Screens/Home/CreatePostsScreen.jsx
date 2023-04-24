import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const initialState = {
  title: "",
  locate: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [location, setLocation] = useState(null);

  const { title, locate } = state;

  const titleHandler = (text) =>
    setState((prevState) => ({ ...prevState, title: text }));
  const locationHandler = (text) =>
    setState((prevState) => ({ ...prevState, locate: text }));

  const makephoto = async () => {
    const foto = await camera.takePictureAsync();
    setPhoto(foto.uri);
    console.log(photo);
  };

  const sendphoto = () => {
    if (photo) {
      navigation.navigate("PostsScreen", { photo, title, locate });
    } else console.log("fffffffffffffffffffffffffffffff");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View style={styles.makePhotoContainer}>
          <Image
            source={{ uri: photo ? photo : "../../assets/photoBG" }}
            style={{ width: 373, height: 200 }}
          />

          <TouchableOpacity onPress={makephoto} style={styles.snapContainer}>
            <Text style={styles.button}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.form}>
        <View>
          <KeyboardAvoidingView
            style={styles.cont}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Text
              style={{ ...styles.text, marginBottom: isShowKeyboard ? 10 : 33 }}
            >
              Загрузите фото
            </Text>
            <TextInput
              value={state.title}
              onChangeText={titleHandler}
              placeholder="Название..."
              style={styles.inputTitle}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={state.locate}
              onChangeText={locationHandler}
              placeholder="Местность..."
              style={styles.inputLocation}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={{ top: -50, left: 10, width: 30 }}>
              <Feather name="map-pin" size={24} color="black" />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={sendphoto} style={styles.sendBtn}>
          <Text style={styles.sendButtonLabel}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "38%",
    marginTop: 30,
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    color: "white",
  },
  makePhotoContainer: {
    // top: 0,
    // marginHorizontal: 25,
    // borderWidth: 1,
    // borderColor: "white",
    // borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    top: -90,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    marginHorizontal: 30,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "#FF6C00",
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
  },
  sendButtonLabel: {
    color: "#FFFFFF",
  },

  inputTitle: {
    width: 343,
    height: 50,
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  inputLocation: {
    width: 343,
    height: 50,
    padding: 10,
    paddingLeft: 50,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
});
