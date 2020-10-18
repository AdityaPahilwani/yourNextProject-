import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Colors from "../../Constants/Colors";

const CustomButton = (props) => {
  const { title, onPress, btnStyle, fontStyle, loading } = props;
  return (
    <TouchableOpacity
      style={[styles.touchable, btnStyle]}
      onPress={onPress}
     
    >
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Text style={[styles.btnFont, fontStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.buttonColor,
  },
  btnFont: { fontSize: 22 },
});

export default CustomButton;
