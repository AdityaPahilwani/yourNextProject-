import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Share,
} from "react-native";
import Header from "../../COMPONENTS/Header components/Header";

import CacheImageBackground from "../../COMPONENTS/cache image components/cacheImageBackground";
import CacheImage from "../../COMPONENTS/cache image components/cacheImage";
import Colors from "../../Constants/Colors";
import TitleData from "../../COMPONENTS/feed components/titleDataContainer";
import TitleArr from "../../COMPONENTS/feed components/titleArray";
import CustomButton from "../../COMPONENTS/global components/CustomButton";
import { useDispatch, useSelector } from "react-redux";

import Avatar from "../../COMPONENTS/global components/Avatar";
import * as sideActionHandler from "../../store/side-effect/interestedUser";

let { height, width } = Dimensions.get("window");
const userContainerHeight = 60;
const marginVertical = 5;
const IMAGEHEIGHT = 300;
const imageBorderRadius = 10;
const paddingHorizontal = 8;
const paddingVertical = marginVertical;

const feedDetail = (props) => {
  const { feedObj } = props.route.params;
  const userInterestedPosts = useSelector(
    (state) => state.auth.userInterestedPost
  );

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

  let { name, profile_picture, userId, bio } = createdBy;

  const loggedUserId = useSelector((state) => state.auth.userId);
  const isAdmin = loggedUserId === userId;
  const isInterested = userInterestedPosts.includes(feedId);
  const notAdminText =
    interestedPeople.length === 0
      ? "Be the first one to take interest"
      : `${interestedPeople.length} are  interested`;
  const adminText =
    interestedPeople.length === 0
      ? "Wait someone will definitely take interest"
      : `We found ${interestedPeople.length} awesome developer for you`;
  const lengthText = isAdmin ? adminText : notAdminText;

  const dispatch = useDispatch();
  const [interest, setInterest] = useState();

  useEffect(() => {
    setInterest(isInterested);
  }, []);
  const DecideLook = () => {
    if (media) {
      return <CacheImage uri={media} style={styles.imageBg} />;
    } else {
      return null;
    }
  };

  const onPress = async () => {
    console.log("yoo");
    if (isAdmin) {
      props.navigation.navigate("interestedUser", {
        interestedPeople,
        feedId,
      });
    } else {
      dispatch(sideActionHandler.toggleInterest(feedObj, !interest));

      setInterest((e) => !e);
    }
  };

  // const onShare = async () => {
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
  // };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.cardBg,
      }}
    >
      <StatusBar />

      <ScrollView>
        <Header HeaderTitle={title} back />
        <View style={{ paddingHorizontal: paddingHorizontal }}>
          <View style={[styles.profileContainer, styles.card]}>
            <Avatar size={60} uri={profile_picture} />
            <View style={{ marginHorizontal: 10, width: "80%" }}>
              <Text style={[styles.userName, styles.bold]} numberOfLines={1}>
                {name}
              </Text>
              <Text style={[styles.projTile, styles.bold]} numberOfLines={1}>
                {bio ? bio : "User was too lazy to update it!"}
              </Text>
            </View>
          </View>
          <DecideLook />
          <TitleData
            cardStyle={styles.card}
            title="Title"
            value={title}
            valueLines={null}
          />
          <TitleData
            cardStyle={styles.card}
            title="Description"
            value={description}
            valueLines={null}
          />
          <TitleData
            cardStyle={styles.card}
            title="We are looking for"
            value={lookingFor}
            valueLines={null}
          />

          <TitleArr
            title="Tech stack"
            MAXHEIGHTTECHSTACK={null}
            arr={techStack}
            cardStyle={styles.card}
          />
          <TitleData
            cardStyle={styles.card}
            title="People interest"
            value={lengthText}
            valueLines={null}
          />

          {isAdmin ? (
            <CustomButton
              title={"View interested people"}
              btnStyle={styles.button}
              onPress={onPress}
            />
          ) : (
            <CustomButton
              title={interest ? "Tap to revert interest" : "Interested?"}
              btnStyle={styles.button}
              onPress={onPress}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: IMAGEHEIGHT,
    resizeMode: "cover",
    borderRadius: imageBorderRadius,
    marginVertical: marginVertical,
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  button: {
    borderRadius: 10,
    height: 50,
    elevation: 3,
    marginVertical: marginVertical,
  },
  card: {
    elevation: 5,
    backgroundColor: Colors.cardBg,
    borderRadius: 5,
    paddingVertical,
    paddingHorizontal,
    marginVertical: marginVertical,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  userName: { fontSize: 22 },
  projTile: { fontSize: 14 },
  bold: { fontWeight: "bold" },
});

export default feedDetail;
