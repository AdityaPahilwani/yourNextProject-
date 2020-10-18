import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";

import Avatar from "./Avatar";

const profileBio = (props) => {
  const { width, height, userName, projTitle, avatarSize } = props;

  return (
    <TouchableOpacity
      style={{ width: width, height: height, ...styles.container }}
    >
      <View style={styles.avatarContainer}>
        <Avatar size={avatarSize} />
      </View>

      <View style={styles.userDetailContainer}>
        <Text style={[styles.userName, styles.bold]} numberOfLines={1}>
          {userName}
        </Text>
        <Text style={[styles.projTile, styles.bold]} numberOfLines={1}>
          {projTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'red',
  },
  userDetailContainer: {
    width: "80%",
    justifyContent: "center",
    height: "100%",
  },
  userName: { fontSize: 22 },
  projTile: { fontSize: 14 },
  bold: { fontWeight: "bold" },
});

export default profileBio;
