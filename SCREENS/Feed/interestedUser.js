import React, { useEffect, useState, useCallback } from "react";
import { View, Dimensions, FlatList, Text, StyleSheet } from "react-native";
import InterestedUserRender from "../../COMPONENTS/feed components/interestedUserRender";
import Header from "../../COMPONENTS/Header components/Header";
import { useDispatch, useSelector } from "react-redux";
import * as sideActionHandler from "../../store/side-effect/interestedUser";
import LottieView from "lottie-react-native";
const paddingHorizontal = 10;
let { width, height } = Dimensions.get("window");
const interestedUser = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  let userData = useSelector((state) => state.feed.feedInterestedUser);
  const { interestedPeople, feedId } = props.route.params;
  userData = userData.filter((e) => {
    return e.parentId === feedId;
  });
  const load = useCallback(async () => {
    try {
      // if (
      //   (!userData && interestedPeople.length === 0) ||
      //   userData.length === 0
      // ) {
      //   console.log("called");
      //   await dispatch(
      //     sideActionHandler.getInterestedUser(interestedPeople, feedId)
      //   );
      // }
      if (userData.length > 0) {
        return;
      }
      console.log("calleeeddd");
      await dispatch(
        sideActionHandler.getInterestedUser(interestedPeople, feedId)
      );
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    load().then(() => {
      setIsLoading(false);
    });
  }, []);

  const renderItem = ({ item, index }) => (
    <InterestedUserRender userObj={item} />
  );

  const emptyComponent = () => {
    if (isLoading === false) {
      return (
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
      );
    }
    return null;
  };
  return (
    <View style={{ flex: 1 }}>
      <Header HeaderTitle={"Interested people"} back />

      {userData.length != interestedPeople.length ? (
        <LottieView
          loop
          autoPlay
          style={styles.lottieContainer}
          source={require("../../Lottie/loading.json")}
        />
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={userData}
          extraData={userData}
          contentContainerStyle={{
            alignItems: "center",
            paddingHorizontal,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  lottieContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default interestedUser;
