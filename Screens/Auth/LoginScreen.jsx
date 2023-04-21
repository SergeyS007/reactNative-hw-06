import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useState } from "react";
import * as Font from "expo-font";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const emailHandler = (text) =>
    setState((prevState) => ({ ...prevState, email: text }));
  const passwordHandler = (text) =>
    setState((prevState) => ({ ...prevState, password: text }));

  const onLogin = () => {
    console.log("CredentialsLogin", state);
  };

  return (
    <View style={styles.form}>
      <View>
        <KeyboardAvoidingView
          style={styles.cont}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Text
            style={{ ...styles.text, marginBottom: isShowKeyboard ? 10 : 33 }}
          >
            Войти
          </Text>
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
          setIsShowKeyboard(false);
          onLogin();
          Keyboard.dismiss();
          setState(initialState);
          navigation.navigate("Home");
        }}
        activeOpacity={0.7}
        style={{ ...styles.btn, marginTop: isShowKeyboard ? 5 : 27 }}
      >
        <Text style={{ color: "white" }}>Войти</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ ...styles.btnText, marginBottom: isShowKeyboard ? 10 : 100 }}
      >
        <Text style={{ color: "#1B4371" }}>
          <Text style={{ color: "#070808" }}>Нет аккаунта?</Text>
          Зарегистрироваться
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    width: "100%",
    // top: -120,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  text: {
    fontSize: 30,
    marginTop: 32,
    marginBottom: 33,
  },
  cont: {
    alignItems: "center",
  },
});
