import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  Modal,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
  AlertIOS,
  Platform,
  Linking,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CacheImageBackground from "../cache image components/cacheImageBackground";
import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("window");

const USERCONTAINERHEIGHT = 250;

const USERPREVIEW = (props) => {
  const { id, closeModal } = props;
  const selectedUserId = useSelector((state) =>
    state.feed.feeds.find((feed) => feed.createdBy.userId === id)
  );

  const { profile_picture, name, linkedin, github } = selectedUserId.createdBy;
  useEffect(() => {
    console.log("mount");
  }, []);

  const openLink = async (link) => {
    if (link === false) {
      notifyMessage("No url provided by user");
      return;
    }
    const supported = await Linking.canOpenURL(link);
    await Linking.openURL(link);
  };

  const notifyMessage = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overLay}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <CacheImageBackground uri={profile_picture} style={styles.imageStyle}>
            <View style={styles.bottomBarImage}>
              <Text style={styles.nameText} numberOfLines={1}>
                {name}
              </Text>
            </View>
          </CacheImageBackground>
        </View>
        <View style={styles.socailHubContainer}>
          <TouchableOpacity
            style={[styles.gitHubContainer, styles.center]}
            onPress={openLink.bind(this, github)}
          >
            <AntDesign name="github" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.linkedInContainer, styles.center]}
            onPress={openLink.bind(this, linkedin)}
          >
            <AntDesign name="linkedin-square" size={44} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overLay: {
    opacity: 0.5,
    backgroundColor: "black",
    height: height,
    width: "100%",
    position: "absolute",
    zIndex: 100,
  },

  container: {
    flexDirection: "row",
    width: "95%",
    position: "absolute",
    zIndex: 102,
    height: USERCONTAINERHEIGHT,
    // marginTop: height / 2 - USERCONTAINERHEIGHT / 2,
    borderRadius: 10,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
  },

  card: {},
  imageContainer: {
    width: "65%",
    height: "100%",
    backgroundColor: "blue",
    borderLeftWidth: 1,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  bottomBarImage: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    height: 50,
    width: "100%",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 32,
    color: "white",
    marginHorizontal: 10,
    width: "100%",
  },
  socailHubContainer: { width: "35%", height: "100%" },
  center: { justifyContent: "center", alignItems: "center" },
  gitHubContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#f5f7fa",
  },
  linkedInContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: "#489cc1",
  },
});

export default USERPREVIEW;
