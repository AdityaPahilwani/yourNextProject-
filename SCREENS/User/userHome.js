import React, { useEffect, useState, useCallback } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
  ToastAndroid,
  AlertIOS,
  Linking,
} from "react-native";
import CacheImage from "../../COMPONENTS/cache image components/cacheImage";
import { useSelector } from "react-redux";
import Header from "../../COMPONENTS/Header components/Header";
import Colors from "../../Constants/Colors";

const { height, width } = Dimensions.get("window");
const imageSizeContainer = 80;
const imageSize = imageSizeContainer - 4;

const edgeColor = "#f3eded";

const FONTSIZE = 20;
const TITLESIZE = 24;
const MARGINVERTICAL = 5;
const BORDER_RADIUS = 10;
const PADDING = 10;

const userHome = (props) => {
  const { navigation } = props;
  const user = useSelector((state) => state.auth.userAttributes);
  let { profile_picture, name, bio } = user;

  const navigateToEdit = () => {
    navigation.navigate("editProfile", {
      user: user,
    });
  };
  const navigateToList = (value) => {
    navigation.navigate("ListProject", {
      type: value,
    });
  };

  const navigateToLinkedin = async () => {
    const link = "https://www.linkedin.com/in/aditya-pahilwani-93b42bb5/";
    if (link === false) {
      notifyMessage("No url provided by user");
      return;
    }
    const supported = await Linking.canOpenURL(link);
    await Linking.openURL(link);
  };
  const contactDev=async()=>{
    const link = "mailto:aditya.pahilwani@gmail.com";
    if (link === false) {
      notifyMessage("No url provided by user");
      return;
    }
    const supported = await Linking.canOpenURL(link);
    await Linking.openURL(link);
  }
  const notifyMessage = (msg) => {
    if (Platform.OS === "android") {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <Header HeaderTitle={name} logout={true} />
      <View style={[styles.cardContainer]}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <View style={styles.profileImgContainer}>
            <CacheImage uri={profile_picture} style={styles.profile_picture} />
          </View>

          <View style={{ flex: 1, ...styles.globalPaddingMargin }}>
            <Text style={[styles.titleFont, styles.bold]}>{name}</Text>
            <Text style={[styles.normalFont]}>
              {bio ? bio : "Let us know about yourself"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToEdit}
        >
          <Text style={[styles.normalFont]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToList.bind(this, "user")}
        >
          <Text style={[styles.normalFont]}>Your projects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToList.bind(this, "interest")}
        >
          <Text style={[styles.normalFont]}>Interested projects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={navigateToLinkedin}
        >
          <Text style={[styles.normalFont]}>Developer linkedin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={contactDev}>
          <Text style={[styles.normalFont]}>Contact developer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  profile_picture: {
    height: imageSize,
    width: imageSize,
    borderRadius: imageSize / 2,
    borderWidth: 1,
    borderColor: "black",
  },
  cardContainer: {
    height: "auto",
    width: width * 0.95,
    padding: PADDING,
    backgroundColor: Colors.cardBg,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: BORDER_RADIUS,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.cardBg,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: BORDER_RADIUS,
    padding: 5,
    borderColor: "black",
    borderWidth: 1,
    marginVertical: MARGINVERTICAL,
    padding: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  globalPaddingMargin: {
    padding: PADDING,
    marginVertical: MARGINVERTICAL,
  },
  normalFont: { fontSize: FONTSIZE },
  titleFont: { fontSize: TITLESIZE },

  profileImgContainer: {
    width: imageSize,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default userHome;
