// import React, { Component, PureComponent } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   Share,
//   Dimensions,
//   alert,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import Avatar from "../global components/Avatar";
// import { AntDesign, Ionicons } from "@expo/vector-icons";
// import Colors from "../../Constants/Colors";
// import CacheImage from "../cache image components/cacheImage";
// import TitleData from "./titleDataContainer";
// import TitleArr from "./titleArray";
// import CustomButton from "../global components/CustomButton";
// import { useSelector, MapStateToProps, connect } from "react-redux";

// const userContainerHeight = 60;
// const Padding = 10;
// const marginVertical = 3;
// const genericFontSize = 16;
// const PROJECTNAMELINES = 1;
// const DESCRIPTIONLINES = 3;
// const LOOKINFORLINES = 2;
// const MAXHEIGHTTECHSTACK = 50;
// const imageBorderRadius = 20;

// let { width, height } = Dimensions.get("window");
// class FeedRender extends PureComponent {
//   onShare = async () => {
//     const link = "http://www.yourNextProject" + "/projectId/" + feedId;
//     try {
//       const result = await Share.share({
//         message:
//           `Hey!` +
//           "\n" +
//           "\n" +
//           `I think you might be interested in this project, it's a project on ` +
//           description +
//           "\n" +
//           "\n" +
//           link,
//         url: link,
//         title: "your next project",
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   render() {
//     const {
//       userName,
//       userAvatarUri,
//       description,
//       media,
//       techStack,
//       title,
//       lookingFor,
//       createdById,
//       feedObj,
//       feedId,
//       openPreviewOfUser,
//       // onShare,
//       margin,
//       navigation,
//     } = this.props;

//     const loggedUserId = this.props.auth.userId;
//     const isAdmin = loggedUserId === createdById;
//     // const navigation = useNavigation();
//     const callBackPreview = () => {
//       openPreviewOfUser(createdById);
//     };

//     return (
//       <TouchableOpacity
//         style={[styles.container, margin]}
//         onPress={() => {
//           navigation.navigate("feedDetail", {
//             feedObj: feedObj,
//           });
//         }}
//       >
//         <View style={styles.userContainer}>
//           <TouchableOpacity
//             style={{ width: "85%", flexDirection: "row" }}
//             onPress={callBackPreview}
//           >
//             <View style={styles.avatarContainer}>
//               <Avatar size={50} uri={userAvatarUri} />
//             </View>

//             <View style={styles.userDetailContainer}>
//               <Text style={[styles.userName, styles.bold]} numberOfLines={1}>
//                 {userName}
//               </Text>
//             </View>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.shareContainer}
//             onPress={this.onShare.bind(this, feedId, description)}
//           >
//             <Ionicons name="md-share" size={30} color="black" />
//           </TouchableOpacity>
//         </View>

//         <View>
//           {/* {media && <Image source={{ uri: media }} style={styles.img} />} */}
//           {media && <CacheImage uri={media} style={styles.img} />}
//         </View>

//         <View style={{ paddingHorizontal: Padding }}>
//           <TitleData
//             cardStyle={null}
//             title="Project name: "
//             value={title}
//             valueLines={PROJECTNAMELINES}
//           />
//           <TitleData
//             cardStyle={null}
//             title="Description"
//             value={description}
//             valueLines={DESCRIPTIONLINES}
//           />
//           <TitleData
//             cardStyle={null}
//             title="We are looking for"
//             value={lookingFor}
//             valueLines={LOOKINFORLINES}
//           />

//           <TitleArr
//             title="Tech stack"
//             MAXHEIGHTTECHSTACK={MAXHEIGHTTECHSTACK}
//             arr={techStack}
//           />

//           <CustomButton
//             title={isAdmin ? "View interested people" : "Interested?"}
//             btnStyle={styles.button}
//           />
//         </View>
//       </TouchableOpacity>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: "auto",
//     width: width * 0.95,
//     justifyContent: "center",
//     backgroundColor: Colors.cardBg,
//     marginVertical: 10,
//     shadowColor: "black",
//     shadowOpacity: 0.26,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 5,
//     borderRadius: 10,
//   },
//   userContainer: {
//     flexDirection: "row",
//     height: userContainerHeight,
//     borderBottomWidth: 0.6,
//   },

//   userName: { fontSize: 22 },
//   title: { fontSize: 14 },
//   bold: { fontWeight: "bold" },
//   avatarContainer: {
//     width: "20%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   img: {
//     width: "100%",
//     height: 150,
//     resizeMode: "cover",
//     borderBottomLeftRadius: imageBorderRadius,
//     borderBottomRightRadius: imageBorderRadius,
//   },
//   userDetailContainer: {
//     width: "65%",
//     justifyContent: "center",
//     height: "100%",
//   },
//   shareContainer: {
//     flex: 1,
//     width: "15%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     marginVertical: marginVertical,
//     padding: 5,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
// });

import React, { Component, PureComponent } from "react";
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
const marginVertical = 3;
const genericFontSize = 16;
const PROJECTNAMELINES = 1;
const DESCRIPTIONLINES = 3;
const LOOKINFORLINES = 2;
const MAXHEIGHTTECHSTACK = 50;
const imageBorderRadius = 20;

let { width, height } = Dimensions.get("window");

class FeedRender extends Component {
  onShare = async (feedId, description) => {
    const link = "http://www.yourNextProject" + "/projectId/" + feedId;
    try {
      const result = await Share.share({
        message:
          `Hey!` +
          "\n" +
          "\n" +
          `I think you might be interested in this project, it's a project on ` +
          description +
          "\n" +
          "\n" +
          link,
        url: link,
        title: "your next project",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  componentDidMount() {
    console.log("redered" + this.props.title);
  }
  componentDidUpdate() {
    console.log("updated" + this.props.title);
  }
  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this, nextProps, nextState);
    return false;
  }
  render() {
    const {
      userName,
      userAvatarUri,
      description,
      media,
      techStack,
      title,
      lookingFor,
      feedObj,
      feedId,
      isAdmin,

      navigation,
    } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={() => {
          navigation.navigate("feedDetail", {
            feedObj: feedObj,
          });
        }}
      >
        <View style={styles.userContainer}>
          <TouchableOpacity style={{ width: "85%", flexDirection: "row" }}>
            <View style={styles.avatarContainer}>
              <Avatar size={50} uri={userAvatarUri} />
            </View>

            <View style={styles.userDetailContainer}>
              <Text style={[styles.userName, styles.bold]} numberOfLines={1}>
                {userName}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareContainer}
            onPress={this.onShare.bind(this, feedId, description)}
          >
            <Ionicons name="md-share" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          {/* {media && <Image source={{ uri: media }} style={styles.img} />} */}
          {media && <CacheImage uri={media} style={styles.img} />}
        </View>

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

          <TitleArr
            title="Tech stack"
            MAXHEIGHTTECHSTACK={MAXHEIGHTTECHSTACK}
            arr={techStack}
          />

          <CustomButton
            title={isAdmin ? "View interested people" : "Interested?"}
            btnStyle={styles.button}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

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
    height: 150,
    resizeMode: "cover",
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
