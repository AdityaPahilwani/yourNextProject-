import React from "react";

import LOGINSCREEN from "../SCREENS/Auth/LOGINSCREEN";
import LoadingScreen from "../SCREENS/Auth/LOADINGSCREEN";
import TabNav from "./bottomNav";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FEED_DETAIL_SCREEN from "../SCREENS/Feed/feedDetail";
import editProfile from "../SCREENS/User/editProfile";
import interestedUser from "../SCREENS/Feed/interestedUser";
import CheckDeepLink from "../SCREENS/checkDeepLink/checkDeepLinking";
import ListProject from "../SCREENS/Feed/ListProject";
const MainNav = createStackNavigator();

const NAVIGATION = () => {
  const Linking = {
    prefixes: ["https://www.yournextproject.co", "exp://yournextproject.co"],

    config: {
      checkDeeplink: {
        path: "projectId/:feedId",
      },
    },
  };
  // npx uri-scheme open https://www.yournextproject.co/projectId/pVCXXyb7u5FWCA6PeeET --android
  // npx uri-scheme open exp://www.yournextproject.co/projectId/pVCXXyb7u5FWCA6PeeET--android
  return (
    <NavigationContainer linking={Linking}>
      <MainNav.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <MainNav.Screen name="LoadingScreen" component={LoadingScreen} />
        <MainNav.Screen name="login" component={LOGINSCREEN} />
        <MainNav.Screen name="DashBoard" component={TabNav} />
        <MainNav.Screen name="feedDetail" component={FEED_DETAIL_SCREEN} />
        <MainNav.Screen name="editProfile" component={editProfile} />
        <MainNav.Screen name="interestedUser" component={interestedUser} />
        <MainNav.Screen name="checkDeeplink" component={CheckDeepLink} />
        <MainNav.Screen name="ListProject" component={ListProject} />
      </MainNav.Navigator>
    </NavigationContainer>
  );
};
export default NAVIGATION;
