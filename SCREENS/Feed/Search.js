import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import Header from "../../COMPONENTS/Header components/Header";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useStore } from "react-redux";
import Colors from "../../Constants/Colors";


const searchScreen = (props) => {
  const { actionHandler } = props;
  const [text, setText] = useState("");
  const [sam, setSamp] = useState();
  const [ARR, setARR] = useState([]);
  // const FEED = useSelector((state) => state.feed.FEEDS);
  // let TEMP = [];

  // const search = () => {
  //   if (text === "") {
  //     return;
  //   }
  //   TEMP = FEED.filter((feed) => {
  //     if (feed.description != false) {
  //       var a = feed.description;
  //       a = a.toLowerCase();
  //       var b = text.toLowerCase();
  //       return a.includes(b);
  //     }
  //   });
  //   console.log(TEMP);
  //   setARR(TEMP);
  //   setSamp(!sam);
  // };
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header HeaderTitle="Search" />

      {/* <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={text}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={}>
          <Text>
            <AntDesign name="search1" size={23} color={Colors.accent} />;
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <FlatList
        keyExtractor={(item) => item.id}
        data={ARR}
        extraData={ARR}
        renderItem={(itemData) => (
          <FeedRender
            name={itemData.item.Uname}
            description={itemData.item.description}
            date={itemData.item.date}
            media={itemData.item.media}
            mediaType={itemData.item.mediaType}
            onPress={() => {
              // props.navigation.navigate("FEED_DETAIL");
            }}
          />
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: wp("100%"),
    height: hp("7%"),
    marginTop: 10,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  textInput: {
    width: "70%",
    height: "100%",
    backgroundColor: "#ace6f6",
    borderRadius: 15,
    padding: 10,
    fontWeight: "bold",
    //borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#ace6f6",
    width: "20%",
    borderRadius: 15,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default searchScreen;
