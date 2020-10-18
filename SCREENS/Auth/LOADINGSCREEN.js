import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  AsyncStorage,
} from "react-native";
import { useDispatch,useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import * as authActions from "../../store/actions/auth";

const LoadingScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      dispatch(authActions.checkForLoggedInUser());
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "DashBoard",
            },
          ],
        })
      );
    };
    tryLogin();
  }, [dispatch]);
  const userIdFound = useSelector((state) => state.auth.userId);

  useEffect(() => {
    console.log("listened" + userIdFound);
    if (userIdFound === "not found") {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "login",
            },
          ],
        })
      );
      return;
    }
    if (userIdFound) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "DashBoard",
            },
          ],
        })
      );
      return;
    }
  }, [userIdFound]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoadingScreen;
