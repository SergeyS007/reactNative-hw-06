import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  const MainTab = createBottomTabNavigator();
  return (
    <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <MainTab.Screen
        options={{
          header: ({ focused, color, size }) => (
            <AntDesign
              name="logout"
              size={30}
              color={color}
              marginTop={35}
              marginLeft={335}
              marginBottom={15}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="pluscircle" size={50} color="orange" />
          ),
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
