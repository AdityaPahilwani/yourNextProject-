import React, { useEffect,useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  AlertIOS,
  Linking
} from "react-native";

import CacheImage from "../cache image components/cacheImage";
import { AntDesign } from "@expo/vector-icons";

const borderRadius = 10;
const marginVertical = 10;
const insideCardPadding = 10;
const iconSize = 16;
const size = 35;
const genericFontSize = 16;
let { height, width } = Dimensions.get("window");

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:");
    }
    prev.current = props;
  });
}

const InterestedUserRender = (props) => {
  let { userObj } = props;
  let { name, profile_picture, userId, bio, github, linkedin } = userObj;
  useTraceUpdate(props);
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
    <View
      style={{
        ...styles.container,
      }}
    >
      <CacheImage uri={profile_picture} style={styles.img} />
      <View style={styles.info}>
        <View style={styles.titleContainer}>
          <Text style={[styles.fontSize, styles.bold]} numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={{
              ...styles.fontSize,
              color: "grey",
              ...styles.bold,
            }}
          >
            Bio
          </Text>
        </View>

        <View style={styles.descriptionSocial}>
          <View style={{ height: "100%", width: "80%" }}>
            <Text style={{ fontSize: 16, width: "100%" }} numberOfLines={7}>
              {bio?bio:'Looks like the developer is too busy making awesome projects,and they forgot to update details xD'}
            </Text>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.gitHubContainer, styles.center]}
              onPress={openLink.bind(this, github)}
            >
              <AntDesign name="github" size={iconSize} color="black" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.linkedInContainer, styles.center]}
              onPress={openLink.bind(this, linkedin)}
            >
              <AntDesign name="linkedin-square" size={iconSize} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: "100%",
    width: "35%",
    overflow: "hidden",
  },
  container: {
    alignItems: "center",
    height: 200,
    width: "100%",
    marginVertical,
    flexDirection: "row",
    borderRadius: borderRadius,
    overflow: "hidden",
  },
  info: {
    height: "100%",
    width: "65%",
    backgroundColor: "#ffffff",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    paddingLeft: insideCardPadding,
    paddingTop: insideCardPadding,
    overflow: "hidden",
  },
  center: { justifyContent: "center", alignItems: "center" },

  bold: {
    fontWeight: "bold",
  },

  fontSize: {
    fontSize: genericFontSize,
  },
  titleContainer: { height: "25%", width: "100%", },
  descriptionSocial: { flex:1, flexDirection: "row", },
  socialContainer: {
    height: "100%",
    width: "20%",
    backgroundColor: "rgba(52, 52, 52, 0.25)",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: borderRadius,
  },
  gitHubContainer: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: "#f5f7fa",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  linkedInContainer: {
    width: size,
    height: size,
    borderRadius: size / 2,

    backgroundColor: "#489cc1",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
});

export default InterestedUserRender;
