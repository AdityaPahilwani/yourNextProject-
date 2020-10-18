import React, { useState, useEffect, memo, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  Dimensions,
  alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Avatar from "../global components/Avatar";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import CacheImage from "../cache image components/cacheImage";
import TitleData from "./titleDataContainer";
import TitleArr from "./titleArray";
import CustomButton from "../global components/CustomButton";
import { useSelector } from "react-redux";

const userContainerHeight = 60;
const Padding = 10;
const marginVertical = 5;
const genericFontSize = 16;
const PROJECTNAMELINES = 1;
const DESCRIPTIONLINES = 3;
const LOOKINFORLINES = 2;
const MAXHEIGHTTECHSTACK = 50;
const imageBorderRadius = 20;

let { width, height } = Dimensions.get("window");

function useTraceUpdate(props) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      // console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
}

const FeedRender = memo((props) => {
  const { feedObj } = props;
  let {
    createdBy,
    title,
    description,
    techStack,
    lookingFor,
    media,
    createdAt,
    feedId,
    interestedPeople,
  } = feedObj;

  let { name, profile_picture, userId } = createdBy;
  const loggedUserId = useSelector((state) => state.auth.userId);

  const isAdmin = loggedUserId === userId;
  const notAdminText =
    interestedPeople.length === 0
      ? "Be the first one to take interest"
      : `${interestedPeople.length} are  interested`;
  const adminText =
    interestedPeople.length === 0
      ? "Wait someone will definitely take interest"
      : `We found ${interestedPeople.length} awesome developer for you`;
  const lengthText = isAdmin ? adminText : notAdminText;
  const navigation = useNavigation();
  // const onShare = useCallback(async () => {
  //   const link = "https://www.yournextproject.co" + "/projectId/" + feedId;
  //   try {
  //     const result = await Share.share({
  //       message:
  //         `Hey!` +
  //         "\n" +
  //         "\n" +
  //         `I think you might be interested in this project, it's a project on ` +
  //         description +
  //         "\n" +
  //         "\n" +
  //         link,
  //       url: link,
  //       title: "your next project",
  //     });
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }, [feedId, description]);

  // useEffect(() => {
  //   console.log("rendered" + title);
  // });

  const navigate = () => {
    navigation.navigate("feedDetail", {
      feedObj: feedObj,
    });
  };
  useTraceUpdate(props);
  return (
    <TouchableOpacity style={[styles.container]} onPress={navigate}>
      <View style={styles.userContainer}>
        <TouchableOpacity style={{ width: "85%", flexDirection: "row" }}>
          <View style={styles.avatarContainer}>
            <Avatar size={50} uri={profile_picture} />
          </View>

          <View style={styles.userDetailContainer}>
            <Text style={[styles.userName, styles.bold]} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.shareContainer}
          onPress={onShare.bind(this, feedId, description)}
        >
          <Ionicons name="md-share" size={30} color="black" />
        </TouchableOpacity> */}
      </View>

      <View>{media && <CacheImage uri={media} style={styles.img} />}</View>

      <View style={{ paddingHorizontal: Padding }} key={Math.random()}>
        <TitleData
          cardStyle={null}
          title="Project name: "
          value={title}
          valueLines={PROJECTNAMELINES}
        />
        <TitleData
          cardStyle={null}
          title="Description"
          value={description}
          valueLines={DESCRIPTIONLINES}
        />
        <TitleData
          cardStyle={null}
          title="We are looking for"
          value={lookingFor}
          valueLines={LOOKINFORLINES}
        />
        <TitleData
          cardStyle={null}
          title="People interest"
          value={lengthText}
          valueLines={1}
        />

        <TitleArr
          title="Tech stack"
          MAXHEIGHTTECHSTACK={MAXHEIGHTTECHSTACK}
          arr={techStack}
        />

        {/* <CustomButton
            title={isAdmin ? "View interested people" : "Interested?"}
            btnStyle={styles.button}
          /> */}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: width * 0.95,
    justifyContent: "center",
    backgroundColor: Colors.cardBg,
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  userContainer: {
    flexDirection: "row",
    height: userContainerHeight,
    borderBottomWidth: 0.6,
  },

  userName: { fontSize: 22 },
  title: { fontSize: 14 },
  bold: { fontWeight: "bold" },
  avatarContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "black",
    borderBottomLeftRadius: imageBorderRadius,
    borderBottomRightRadius: imageBorderRadius,
  },
  userDetailContainer: {
    width: "65%",
    justifyContent: "center",
    height: "100%",
  },
  shareContainer: {
    flex: 1,
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: marginVertical,
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default FeedRender;
