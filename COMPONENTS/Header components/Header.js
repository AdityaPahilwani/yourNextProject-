import React from "react";
import { View, Text, StyleSheet, ImageBackground, Alert } from "react-native";

import HeaderButton from "./headerButton";
import HeaderConstant from "../../Constants/HEADERS";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import HEADERS from "../../Constants/HEADERS";
import { useNavigation,CommonActions } from "@react-navigation/native";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";

const iconSize = 24;

const Header = (props) => {
  const { HeaderTitle, share, edit, back, logout } = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logoutFunc = () => {
    return Alert.alert(
      "Are you sure?",
      "You want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          style: "default",
          onPress: async() => {
            await dispatch(authActions.logout());
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "login",
                  },
                ],
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <ImageBackground
      style={{ width: "100%", height: HeaderConstant.headerHeight }}
      source={require("../../IMAGES/headerWave.png")}
    >
      <View style={styles.container}>
        <View style={styles.backContainer}>
          {back && (
            <HeaderButton
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Ionicons name="ios-arrow-back" size={iconSize} color="white" />
            </HeaderButton>
          )}
        </View>
        <View style={styles.header}>
          <Text style={[styles.projTile, styles.bold]} numberOfLines={1}>
            {HeaderTitle}
          </Text>
        </View>
        <View style={styles.shareContainer}>
          {share && (
            <HeaderButton onPress={share}>
              <Ionicons
                name="md-share"
                size={iconSize}
                color="white"
                onPress={() => {}}
              />
            </HeaderButton>
          )}
          {logout && (
            <HeaderButton onPress={logoutFunc}>
              <AntDesign
                name="user"
                size={iconSize}
                color="white"
                onPress={() => {}}
              />
            </HeaderButton>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: "100%",
    // backgroundColor:'red'
  },
  backContainer: {
    width: "15%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "70%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  shareContainer: {
    width: "15%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  projTile: { fontSize: 28, color: "white" },
  bold: { fontWeight: "900" },
});

export default Header;
