import React, { useEffect, useState, useCallback } from "react";

import { View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Avatar from "./Avatar";
import CacheImage from "../cache image components/cacheImage";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const edgeColor = "#f3eded";

const editProfileAvatar = (props) => {
  const {
    imageSize,
    profile_picture,

    imageSizeContainer,
    editIconContainerSize,
    editIconSize,
    imageCallBack,
  } = props;

  const [profilePic, setProfilePic] = useState(profile_picture);


  // if(imageCallBack && onPress){
  //   Alert.alert(
  //     "you can't have both functionality",
  //     "You need to grant camera permission",
  //     [{ text: "Okay" }]
  //   );
  //   return ;
  // }

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permission",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const mediaHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const mediaResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.1,
    });
    if (!mediaResult.cancelled) {
      setProfilePic(mediaResult.uri);
      imageCallBack(mediaResult.uri);
    }
  };

  return (
    <View style={styles.profileImgContainer(imageSizeContainer, edgeColor)}>
      <Image
        source={{ uri: profilePic }}
        style={{
          height: imageSize,
          width: imageSize,
          borderRadius: imageSize / 2,
        }}
      />
      <View
        style={styles.editIconContainer(
          imageSizeContainer,
          editIconContainerSize
        )}
      >
        <TouchableOpacity
          style={styles.editIconButton(editIconContainerSize, edgeColor)}
          onPress={mediaHandler}
        >
          <Entypo name="edit" size={editIconSize} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImgContainer: (imageSizeContainer) => ({
    width: imageSizeContainer,
    height: imageSizeContainer,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: imageSizeContainer / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: edgeColor,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  }),
  editIconContainer: (imageSizeContainer, editIconContainerSize) => ({
    width: imageSizeContainer,
    height: editIconContainerSize,
    alignItems: "flex-end",
    marginTop: -editIconContainerSize,
  }),
  editIconButton: (editIconContainerSize) => ({
    height: editIconContainerSize,
    width: editIconContainerSize,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: edgeColor,
    opacity: 1,
    borderRadius: editIconContainerSize / 2,
    borderWidth: 0.8,
  }),
});

export default editProfileAvatar;
