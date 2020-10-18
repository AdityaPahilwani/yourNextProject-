import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const headerButton = (props) => {
  const { onPress,children } = props;
  return (
    <TouchableOpacity style={styles.backButtonContainer} onPress={onPress}>
     {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 12,
    backgroundColor: "rgba(52, 52, 52, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default headerButton;
