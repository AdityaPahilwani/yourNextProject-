import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../COMPONENTS/Header components/Header";
import FeedRender from "../../COMPONENTS/feed components/feedRender";
import * as authActions from "../../store/actions/auth";
import LottieView from "lottie-react-native";
import Colors from "../../Constants/Colors";

let { width, height } = Dimensions.get("window");

const ListProject = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { type } = props.route.params;
  let userCreatedPostArr = useSelector(
    (state) => state.auth.userCreatedPostArr
  );
  let userInterestedPostArr = useSelector(
    (state) => state.auth.userInterestedPostArr
  );

  let userCreatedPost = useSelector((state) => state.auth.userCreatedPost);
  let userInterestedPost = useSelector(
    (state) => state.auth.userInterestedPost
  );

  let Data = type === "user" ? userCreatedPostArr : userInterestedPostArr;
  let dataType = type === "user" ? userCreatedPost : userInterestedPost;
  Data = Data ? Data : [];
  dataType = dataType ? dataType : [];
  const load = useCallback(async () => {
    let action;
    if (type === "user") {
      if (!userCreatedPostArr || userCreatedPostArr.length === 0) {
        action = await dispatch(authActions.fetchUserPost());
      }
    } else {
      if (!userInterestedPostArr) {
        await dispatch(authActions.fetchUserInterestedPost());
      }
    }
  }, [type, dispatch]);
  useEffect(() => {
    setIsLoading(true);
    load().then(() => {
      console.log("finishedd");
      setIsLoading(false);
    });
  }, []);
  const renderItem = ({ item, index }) => <FeedRender feedObj={item} />;
  const headerText = type === "user" ? "Your projects" : "Interested projects";
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <Header HeaderTitle={headerText} back />
      {Data.length != dataType.length ? (
        <LottieView
          loop
          autoPlay
          style={styles.lottieContainer}
          source={require("../../Lottie/loading.json")}
        />
      ) : (
        <FlatList
          keyExtractor={(item) => item.feedId}
          data={Data}
          extraData={Data}
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
          renderItem={renderItem}
          ListEmptyComponent={
            <View
              style={{
                height: height,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Nothing to show
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
export default ListProject;
