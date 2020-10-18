import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import firebase from "firebase";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Color from "../../Constants/Colors";

import { CommonActions } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";

import { LinearGradient } from "expo-linear-gradient";

let { height, width } = Dimensions.get("window");

let BORDER_RADIUS = 10;

const LOGINSCREEN = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [request, setRequest] = useState();

  const userIdFound = useSelector((state) => state.auth.userId);

  useEffect(() => {
    console.log("listened" + userIdFound);
    if (userIdFound === "not found") {
      setIsLoading(false);
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

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const signInWithGoogleAsync = async () => {
    try {
      setRequest(true);
      setIsLoading(true);
      await dispatch(authActions.login());
    } catch (err) {
      setError(err.message);
      // setIsLoading(false);
    }
    // setRequest(false);
    // setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <ImageBackground
        style={styles.imageBg}
        source={require("../../assets/1.jpg")}
      >
        <LinearGradient
          // Background Linear gradient
          start={{ x: 0, y: 12 }}
          end={{ x: 6, y: -12 }}
          colors={["#ffffff", "#F9D423"]}
          style={styles.linearBg}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={signInWithGoogleAsync}
            disabled={isLoading}
          >
            {!isLoading ? (
              <>
                <View style={styles.imgContainer}>
                  <Image
                    style={styles.googleImg}
                    source={require("../../assets/2.png")}
                  />
                </View>
                <Text style={styles.btnText}>Tap to continue</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="blue" />
            )}
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBg: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  linearBg: {
    height: 70,
    width: "90%",
    borderRadius: 20,
    marginBottom: 30,
  },
  button: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  imgContainer: {
    height: "100%",
    width: 80,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  googleImg: {
    height: "100%",
    width: "100%",
    padding: 30,
  },
  btnText: { marginLeft: 20, fontSize: 20, fontWeight: "bold" },
});

export default LOGINSCREEN;
