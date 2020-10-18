import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Animated,
  StatusBar,
} from "react-native";
import EditProfileAvatar from "../../COMPONENTS/global components/editUserAvatar";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import Header from "../../COMPONENTS/Header components/Header";
import CustomButton from "../../COMPONENTS/global components/CustomButton";
import * as authActions from "../../store/actions/auth";
import { useDispatch } from "react-redux";

let { height, width } = Dimensions.get("window");

const FONTSIZE = 20;
const TITLESIZE = 24;
const MARGINVERTICAL = 10;
const BORDER_RADIUS = 14;
const imageSizeContainer = 80;
const imageSize = imageSizeContainer - 4;
const editIconContainerSize = 25;
const editIconSize = 14;
const PADDING = 10;
const edgeColor = "#f3eded";

const editProfile = (props) => {
  const { user } = props.route.params;
  const { navigation } = props;
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setlasName] = useState(user.lastName);
  const [github, setGithub] = useState(user.github);
  const [linkedIn, setLinkedin] = useState(user.linkedin);
  const [bio, setBio] = useState(user.bio);
  const [profilePic, setProfilePic] = useState(user.profile_picture);
  const [isLoading, setIsLoading] = useState(false);


  const setNewUrl = (url) => {
    setProfilePic(url);
  };

  useEffect(() => {
    console.log(profilePic);
  }, [profilePic]);

  const firstNameHandler = (text) => {
    if (text.length > 25) {
      return;
    }
    setFirstname(text);
  };

  const lastNameHandler = (text) => {
    if (text.length > 25) {
      return;
    }
    setlasName(text);
  };

  const bioHandler = (text) => {
    if (text.length > 100) {
      return;
    }
    setBio(text);
  };

  const linkedInHandler = (text) => {
    setLinkedin(text);
  };

  const githubHandler = (text) => {
    setGithub(text);
  };

  const editUser = async () => {
    if (firstName && lastName && profilePic && bio && github && linkedIn) {
      setIsLoading(true);
      await dispatch(
        authActions.editProfile(
          firstName,
          lastName,
          github,
          linkedIn,
          bio,
          profilePic
        )
      );

      setIsLoading(false);
      navigation.goBack();
    } else {
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <Header HeaderTitle="Edit Profile" back />
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: imageSizeContainer / 2,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
          <View style={{ marginTop: -imageSizeContainer / 2 }}>
            <EditProfileAvatar
              imageSize={imageSize}
              profile_picture={profilePic}
              imageSizeContainer={imageSizeContainer}
              editIconContainerSize={editIconContainerSize}
              editIconSize={editIconSize}
              imageCallBack={setNewUrl}
            />
          </View>

          <View style={{ padding: PADDING, width: "100%" }}>
            <TextInput
              style={styles.textInput}
              numberOfLines={1}
              placeholderTextColor="black"
              numberOfLines={1}
              placeholder="First name"
              value={firstName}
              onChangeText={firstNameHandler}
            />

            <TextInput
              style={styles.textInput}
              numberOfLines={1}
              placeholderTextColor="black"
              numberOfLines={1}
              placeholder="Last name"
              value={lastName}
              onChangeText={lastNameHandler}
            />

            <TextInput
              style={styles.textInput}
              placeholderTextColor="black"
              multiline
              placeholder="Bio"
              value={bio}
              onChangeText={bioHandler}
            />

            <TextInput
              style={styles.textInput}
              placeholderTextColor="black"
              multiline
              placeholder="Enter your linkedIn url"
              value={linkedIn}
              onChangeText={linkedInHandler}
            />

            <TextInput
              style={styles.textInput}
              placeholderTextColor="black"
              multiline
              placeholder="Enter your github url"
              value={github}
              onChangeText={githubHandler}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={editUser}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color={Colors.primary} />
              ) : (
                <Text style={{ fontSize: 20 }}>Save changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: "auto",
    width: width * 0.93,
    backgroundColor: "#f5f7fa",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    marginVertical: MARGINVERTICAL,
    alignItems: "center",
  },

  textInput: {
    width: "100%",
    backgroundColor: Colors.TEXTINPUTBG,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    marginVertical: MARGINVERTICAL,
    fontSize: FONTSIZE,
    textAlignVertical: "top",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    marginVertical: MARGINVERTICAL,
  },
});

export default editProfile;
