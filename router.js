import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./Screens/Auth/RegistrationScreen";
import LoginScreen from "./Screens/Auth/LoginScreen";
import CommentsScreen from "./Screens/Home/CommentsScreen";
import MapScreen from "./Screens/Home/MapScreen";
import Home from "./Screens/Home/Home";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="CommentsScreen"
          component={CommentsScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="MapScreen"
          component={MapScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};
