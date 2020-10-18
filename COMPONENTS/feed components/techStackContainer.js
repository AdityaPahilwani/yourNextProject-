import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from '../../Constants/Colors'


const TechStack = (props) => {
  const { onPress, parentStyle,value,key } = props;

  const ParentView = onPress ? TouchableOpacity : View;

  return (
    <ParentView style={[styles.techStackValueContainer,parentStyle]} onPress={onPress} key={key}>
      <Text style={{ fontSize: 16 }}>{value}</Text>
    </ParentView>
  );
};

const styles = StyleSheet.create({
  techStackValueContainer: {
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
export default TechStack;
