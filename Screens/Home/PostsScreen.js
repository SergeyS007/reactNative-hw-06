import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logoutDB } from "../../redux/auth/authOperations";
import ProfileScreen from "./ProfileScreen";
import CommentsScreen from "../NastedScreens/CommentsScreen";
import MapScreen from "../NastedScreens/MapScreen";
import DefaultScreenPosts from "../NastedScreens/DefaultScreenPosts";
import { MaterialIcons } from "@expo/vector-icons";

const PostedScreen = createStackNavigator();

export default function PostsScreen() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutDB());
  };
  return (
    <PostedScreen.Navigator>
      <PostedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публикации",
          headerTitleAlign: "center",

          headerRight: () => (
            <TouchableOpacity style={styles.logOutBtn} onPress={logout}>
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),

          headerLeft: () => null,
        }}
      />
      <PostedScreen.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
        }}
      />
      <PostedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
          headerBackTitleVisible: false,
          headerTitleAlign: "center",
        }}
      />
    </PostedScreen.Navigator>
  );
}

const styles = StyleSheet.create({
  logOutBtn: {
    marginRight: 19,
  },
});
