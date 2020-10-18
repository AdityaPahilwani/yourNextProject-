import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";

const marginVertical = 3;
const genericFontSize = 16;

const titleData = memo((props) => {
  const { title, value, valueLines, cardStyle } = props;
  return (
    <View style={cardStyle} key={Math.random()}>
      <Text style={styles.caption} numberOfLines={1}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: genericFontSize,
        }}
        numberOfLines={valueLines}
      >
        {value}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  caption: { fontSize: 24 },
});

export default titleData;
