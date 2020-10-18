import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import userHome from "../SCREENS/User/userHome";

const userNav = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const userNavigator = () => {
  return (
    <userNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <userNav.Screen
        name="user"
        component={userHome}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </userNav.Navigator>
  );
};

export default userNavigator;
