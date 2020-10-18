import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import CacheImage from "../cache image components/cacheImage";

const BorderRadius = 10;

const Avatar = (props) => {
  const { size, uri } = props;
  const styles = StyleSheet.create({
    avatarContainer: {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: "white",
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    img: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.avatarContainer}>
      <CacheImage uri={uri} style={styles.img} />
    </View>
  );
};

export default Avatar;
