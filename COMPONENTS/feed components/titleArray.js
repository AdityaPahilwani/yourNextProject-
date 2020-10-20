import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";

import TechStack from "./techStackContainer";

const marginVertical = 3;

const titleData = (props) => {
  const { title, MAXHEIGHTTECHSTACK, cardStyle, arr } = props;
  return (
    <View style={cardStyle}>
      <Text style={styles.caption} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ ...styles.container, maxHeight: MAXHEIGHTTECHSTACK }}>
        {arr.map((res) => {
          return (
            <TechStack value={res.value} parentStyle={styles.techStack} key={Math.random()}></TechStack>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    overflow: "hidden",
  },
  bold: { fontWeight: "bold" },
  caption: { fontSize: 24,},
  techStack: { marginRight: 7, marginVertical: 5 },
});

export default titleData;
