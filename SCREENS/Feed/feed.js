import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  Alert,
  StatusBar,
  Animated,
  Dimensions,
  Modal,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  Share,
  Text,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import Header from "../../COMPONENTS/Header components/Header";
import FeedRender from "../../COMPONENTS/feed components/feedRender";

import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import { useScrollToTop } from "@react-navigation/native";

import * as feed from "../../store/actions/feed";
import LottieView from "lottie-react-native";
import Colors from "../../Constants/Colors";

import USERPREVIEW from "../../COMPONENTS/global components/userPreview";

const USERCONTAINERHEIGHT = 250;

let { width, height } = Dimensions.get("window");

const feedScreen = (props) => {
  let onEndReachedCalledDuringMomentum = false;
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  // const [selectedId, setSelectedId] = useState(false);
  // const [modal, setModal] = useState(false);

  let feeds = useSelector((state) => state.feed.feeds);
  let nothingToFetch = useSelector((state) => state.feed.nothingToFetch);
  const loggedUserId = useSelector((state) => state.auth.userId);
  // let isFetching = useSelector((state) => state.feed.isFetching);
  const load = useCallback(
    async (paginate, calledFrom) => {
      try {
        // console.log(paginate, calledFrom);
        // await dispatch(feed.turnOnFetching());
        await dispatch(feed.fetchPost(paginate));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch, setIsLoading]
  );

  useEffect(() => {
    if (!isLoading && !pageLoading) {
      setIsLoading(true);

      load(false, "useEffect").then(() => {
        setIsLoading(false);
      });
    } else {
      return;
    }
  }, []);

  const paginate = useCallback(async () => {
    console.log("end reached", nothingToFetch);

    if (!pageLoading) {
      console.log("called from paginate");
      setPageLoading(true);
      load(true, "on scrolll function").then(() => {
        setPageLoading(false);
      });
    }
    onEndReachedCalledDuringMomentum = true;

    return;
  }, [nothingToFetch, pageLoading]);

  const loader = () => {
    if (!nothingToFetch) {
      return (
        <View style={{ width: width, height: 50, alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
    return null;
  };

  const flatListRef = useRef(null);

  useScrollToTop(flatListRef);
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
  const renderItem = ({ item, index }) => <FeedRender feedObj={item} />;
  return (
    <View style={{ flex: 1 }}>
      <StatusBar />

      <Header HeaderTitle="Feed" />

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={closeModal}
      >
        <USERPREVIEW id={selectedId} closeModal={closeModal} />
      </Modal> */}
      {isLoading ? (
        <LottieView
          loop
          autoPlay
          style={styles.lottieContainer}
          source={require("../../Lottie/loading.json")}
        />
      ) : (
        <FlatList
          keyExtractor={(item) => item.feedId}
          data={feeds}
          ref={flatListRef}
          bounces={false}
          extraData={feeds}
          style={{ flex: 1 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum = false;
          }}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum && !pageLoading) {
              paginate();
            }
          }}
          ListFooterComponent={loader}
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
export default feedScreen;
