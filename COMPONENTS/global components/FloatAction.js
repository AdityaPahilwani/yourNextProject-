import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";
import {Ionicons} from '@expo/vector-icons'
import Colors from '../Constants/Colors'

const FloatAction = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.fab}>
     {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    elevation: 8,
  },
});

export default FloatAction;