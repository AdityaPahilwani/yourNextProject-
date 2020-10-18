import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import * as authActions from "../../store/actions/auth";

const CheckDeepLink = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      let userData = await AsyncStorage.getItem("userData");
      userData = JSON.parse(userData);
      // console.log(userData)
      if (!userData || userData.length === 0) {
        // props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: "login",
        //       },
        //     ],
        //   })
        // );
        return;
      }

      dispatch(
        authActions.authenticate(userData.userId, userData.userAttributes)
      );
    //   props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [
    //         {
    //           name: "DashBoard",
    //         },
    //       ],
    //     })
    //   );
    };
    tryLogin();
  }, [dispatch]);
  console.log('param recieved'+props.route.params.feedId)
  return (
    <LottieView
      loop
      autoPlay
      style={styles.lottieContainer}
      source={require("../../Lottie/loading.json")}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CheckDeepLink;
