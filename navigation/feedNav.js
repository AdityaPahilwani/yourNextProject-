import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import feedScreen from "../SCREENS/Feed/feed";
import FEED_DETAIL_SCREEN from "../SCREENS/Feed/feedDetail";

const feedNav = createStackNavigator();

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

const feedNavigator = () => {
  return (
    <feedNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <feedNav.Screen
        name="feed"
        component={feedScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      {/* <feedNav.Screen name="feedDetail" component={FEED_DETAIL_SCREEN} /> */}
    </feedNav.Navigator>
  );
};

export default feedNavigator;
