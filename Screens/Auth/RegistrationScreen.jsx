import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import * as Font from "expo-font";
import { registerDB } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const loginHandler = (text) =>
    setState((prevState) => ({ ...state, login: text }));
  const emailHandler = (text) =>
    setState((prevState) => ({ ...state, email: text }));
  const passwordHandler = (text) =>
    setState((prevState) => ({ ...state, password: text }));

  const onRegister = () => {
    console.log("Credentials", state);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(registerDB(state));
    setState(initialState);
    // navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageBG}
          source={require("../../assets/photoBG.png")}
        >
          <View style={styles.form}>
            <View>
              <KeyboardAvoidingView
                style={styles.cont}
                behavior={Platform.OS == "ios" ? "padding" : "height"}
              >
                <View style={styles.image}></View>
                <TouchableOpacity style={styles.inputText}>
                  <Image
                    style={styles.imageAdd}
                    source={require("../../assets/add.png")}
                  ></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.text,
                    marginBottom: isShowKeyboard ? 10 : 33,
                  }}
                >
                  Регистрация
                </Text>
                <TextInput
                  value={state.login}
                  onChangeText={loginHandler}
                  placeholder="Логин"
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  value={state.email}
                  onChangeText={emailHandler}
                  placeholder="Адрес электронной почты"
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TextInput
                  value={state.password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => setIsShowKeyboard(true)}
                />
                <TouchableOpacity style={styles.inputText}>
                  <Text style={{ color: "#1B4371" }}>Показать</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
            <TouchableOpacity
              onPress={() => {
                onRegister();
              }}
              activeOpacity={0.7}
              style={{ ...styles.btn, marginTop: isShowKeyboard ? 5 : 27 }}
            >
              <Text style={{ color: "white" }}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={{
                ...styles.btnText,
                marginBottom: isShowKeyboard ? 10 : 78,
              }}
            >
              <Text style={{ color: "#1B4371" }}>
                <Text style={{ color: "#070808" }}>Уже есть аккаунт?</Text>{" "}
                Войти
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    width: 343,
    height: 50,
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  inputText: {
    top: -50,
    left: 120,
  },
  btn: {
    width: 343,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {},
  form: {
    marginTop: 100,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  image: {
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    top: -60,
    borderRadius: 16,
  },
  imageAdd: {
    top: -60,
    left: -60,
  },
  text: {
    fontSize: 30,
    marginTop: -65,
  },
  cont: {
    alignItems: "center",
  },
});
