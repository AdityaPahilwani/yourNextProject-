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
  PixelRatio,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import Header from "../../COMPONENTS/Header components/Header";

import TechStack from "../../COMPONENTS/feed components/techStackContainer";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import * as feedActions from "../../store/actions/feed";

import { useDispatch } from "react-redux";

import { CommonActions } from "@react-navigation/native";

let { height, width } = Dimensions.get("window");

const FONTSIZE = 20;
const TITLESIZE = 24;
const MARGINVERTICAL = 10;
const BORDER_RADIUS = 14;
const TEXTINPUTHEIGHT = 50;
const NEW_POST = (props) => {
  const [pickedMedia, setPickedMedia] = useState(false);
  const [type1, setType1] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [description, setDescription] = useState();
  const [lookingFor, setLookingFor] = useState();
  const [title, setTitle] = useState();
  const [techStackArr, setTechStackArr] = useState([]);
  const [techStack, setTechStack] = useState();
  const [formUri, setFormUri] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
    setError(null)
  }, [error]);

  let type;

  // const savePost = async () => {
  //   if (((description === "" && pickedMedia === "") || (!description && !pickedMedia))) {
  //     setError("Please all details");
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);
  //     await dispatch(feed.insert(description, pickedMedia, type1));
  //     props.navigation.goBack();
  //     setIsLoading(false);
  //   } catch (err) {
  //     setError(err.message);
  //     setIsLoading(false);
  //   }
  // };

  const { navigation } = props;
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", clearData);

    return unsubscribe;
  }, [clearData, navigation]);

  const clearData = () => {
    setTitle();
    setDescription();
    setError();
    setTechStack();
    setTechStackArr([]);
    setPickedMedia();
    setLookingFor();
    setIsLoading(false);
  };

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
      console.log(mediaResult);
      setPickedMedia(mediaResult.uri);
    }
  };

  const HeightRef = useRef(new Animated.Value(0)).current;

  const createPost = async () => {
    if (
      title &&
      description &&
      lookingFor &&
      Array.isArray(techStackArr) &&
      techStackArr.length !== 0
    ) {
    
      setIsLoading(true);
      await dispatch(
        feedActions.insert(
          title,
          description,
          techStackArr,
          lookingFor,
          pickedMedia
        )
      );
      props.navigation.goBack();
      setIsLoading(false);
    } else {
      setError(
        "Make sure title,desctiption,looking-for and techStack aren't empty"
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <Header HeaderTitle="Add Post" />

        <View style={styles.container}>
          <TextInput
            style={styles.textInputContainer}
            numberOfLines={1}
            multiline={false}
            placeholder="Title"
            value={title}
            onChangeText={(text) => {
            
              if (text.length > 25) {
                return;
              }
              setTitle(text);
            }}
          />

          <TextInput
            style={{ ...styles.textInputContainer,height:null }}
            multiline={true}
            value={description}
            multiline={true}
            scrollEnabled={true}
            onChangeText={(text) => {
              if (text.length > 150) {
                return;
              }
              setDescription(text);
            }}
            placeholder="Description"
          />
          <TextInput
            style={{ ...styles.textInputContainer }}
            multiline={true}
            value={lookingFor}
            multiline={true}
            scrollEnabled={true}
            onChangeText={(text) => {
              if (text.length > 80) {
                return;
              }
              setLookingFor(text);
            }}
            placeholder="What are you looking for?"
          />
          <View style={styles.techStackContainer}>
            <TextInput
              style={{ ...styles.textInputContainer, width: "80%" }}
              value={techStack}
              onChangeText={(text) => {
                if (text.length > 20) {
                  return;
                }

                setTechStack(text);
              }}
              placeholder="Tech stack"
            />
            <TouchableOpacity
              style={styles.techStackButton}
              onPress={() => {
                if (techStack.length === 0) {
                  return;
                }
                const newTech = { id: Math.random(), value: techStack };
            
                setTechStackArr((prevState) => [...prevState, newTech]);
                setTechStack("");
              }}
            >
              <AntDesign name="check" size={16} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.stackWrapper}>
            {techStackArr.map((res) => {
              return (
                <TechStack
                  parentStyle={styles.techStackValueContainer}
                  onPress={() => {
                    const newTechStack = techStackArr.filter((tech) => {
                      if (tech.id !== res.id) {
                        return tech;
                      }
                    });
                    setTechStackArr(newTechStack);
                  }}
                  value={res.value}
                />
              );
            })}
          </View>
          <View style={styles.media}>
            {!pickedMedia ? (
              <TouchableOpacity style={styles.Image} onPress={mediaHandler}>
                <AntDesign name="camera" size={24} color={Colors.primary} />
                <Text style={{ color: Colors.primary, fontSize: 18 }}>
                  Click to add photo
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.Image} onPress={mediaHandler}>
                <ImageBackground
                  style={{ ...styles.Image, resizeMode: "cover" }}
                  source={{
                    uri: pickedMedia,
                  }}
                >
                  <View style={styles.crossContainer}>
                    <TouchableOpacity
                      style={styles.crossButton}
                      onPress={() => {
                        setPickedMedia(false);
                      }}
                    >
                      <MaterialIcons
                        name="cancel"
                        size={28}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={createPost}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary}/>
            ) : (
              <Text style={{ fontSize: 20 }}>Create</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: width * 0.95,
    backgroundColor: "red",
    backgroundColor: "#f5f7fa",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  textInputContainer: {
    fontSize: FONTSIZE,
    width: "100%",
    backgroundColor: Colors.TEXTINPUTBG,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    height: TEXTINPUTHEIGHT,
    marginVertical: MARGINVERTICAL,
  },
  title: {
    fontSize: TITLESIZE,
    fontWeight: "bold",
    color: "black",
    width: "100%",
    borderRadius: BORDER_RADIUS,
    paddingLeft: 10,
    marginVertical: MARGINVERTICAL,
  },
  techStackContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  techStackInput: {
    backgroundColor: Colors.TEXTINPUTBG,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    width: "80%",
  },
  techStackButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: TEXTINPUTHEIGHT,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
  },
  techStackValueContainer: {
    marginVertical: 5,
    marginRight: MARGINVERTICAL,
  },
  crossContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  crossButton: {
    height: 36,
    width: 36,
    borderBottomLeftRadius: 36 / 2,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  media: {
    alignItems: "center",
    height: 200,
    width: "100%",
    borderRadius: 10,
    backgroundColor: Colors.TEXTINPUTBG,
    overflow: "hidden",
    marginVertical: MARGINVERTICAL,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
    borderRadius: BORDER_RADIUS,
    padding: 10,
    marginVertical: MARGINVERTICAL,
  },
  Image: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  stackWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
  },
});

NEW_POST.navigationOptions = (navData) => {
  return {};
};
export default NEW_POST;
