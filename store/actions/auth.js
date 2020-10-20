import { AsyncStorage } from "react-native";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const LOGOIN = "LOGOIN";
export const FETCH_USER_POST = "FETCH_USER_POST";
export const FETCH_USER_INTERESTED_POST = "FETCH_USER_INTERESTED_POST";
export const EDIT_USER = "EDIT_USER";
import * as firebase from "firebase/app";
import "firebase/firestore";
import * as helperFunctions from "../helper/helper";
import * as apiConstant from "../apiConstant/apiConstant";
import * as Google from "expo-google-app-auth";
import user from "../../Models/user";
export const authenticate = (
  userId,
  userAttr,
  createdPosts,
  interestedPosts
) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      userId,
      userAttr,
      createdPosts,
      interestedPosts,
    });
  };
};

const onSignIn = async (googleUser) => {
  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    var credential = firebase.auth.GoogleAuthProvider.credential(
      googleUser.idToken,
      googleUser.accessToken
    );
    // console.log(credential);
    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(function (result) {
        console.log("user signed in ");

        if (result.additionalUserInfo.isNewUser) {
          apiConstant
            .getUserCollectionRef()
            .doc(result.user.uid)
            .set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              firstName: result.additionalUserInfo.profile.given_name,
              lastName: result.additionalUserInfo.profile.family_name,
              name:
                result.additionalUserInfo.profile.given_name +
                " " +
                result.additionalUserInfo.profile.family_name,
              linkedin: false,
              github: false,
              bio: false,
              created_at: firebase.firestore.FieldValue.serverTimestamp(),
              createdPosts: [],
              interestedPosts: [],
            })
            .then(function (snapshot) {
              // console.log('Snapshot', snapshot);
            });
        } else {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId: "//YOUR_OAUTH_ID",
      behavior: "web",
      // iosClientId:
      //   "YOUR_OAUTH_ID",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      onSignIn(result);
    }
    if (result.type === "cancel") {
      //   console.log("Yooo");
    }
    return result.type;
  } catch (e) {
    // console.log(e);
  }
};

export const login = () => {
  return async (dispatch) => {
    const result = await signInWithGoogleAsync();
    if (result === "cancel") {
      dispatch(authenticate("not found", "not found", [], []));
    }
    await dispatch(checkForLoggedInUser());
    // checkForLoggedInUser();
  };
};

export const checkForLoggedInUser = () => {
  return async (dispatch) => {
    console.log("called checkForLoggedInUser");
    firebase.auth().onAuthStateChanged(async (userSnapshot) => {
      if (userSnapshot) {
        const uid = userSnapshot.uid;
        console.log(uid);
        try {
          const dataSnapshot = await apiConstant
            .getUserCollectionRef()
            .doc(uid)
            .get();

          let res = dataSnapshot.data();
          let {
            name,
            firstName,
            lastName,
            bio,
            github,
            linkedin,
            gmail,
            profile_picture,
            created_at,
            createdPosts,
            interestedPosts,
          } = res;
          let User = new user(
            uid,
            name,
            firstName,
            lastName,
            bio,
            github,
            linkedin,
            gmail,
            profile_picture,
            created_at
          );

          dispatch(authenticate(uid, User, createdPosts, interestedPosts));
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("nope");
        dispatch(authenticate("not found", "not found", [], []));
      }
    });
  };
};

export const editProfile = (
  updatedFirstName,
  updatedLastName,
  updatedGithub,
  updatedLinkedIn,
  updatedBio,
  updatedProfilePic
) => {
  return async (dispatch, getState) => {
    const {
      userId,
      userAttributes,
      userCreatedPost,
      userInterestedPost,
    } = getState().auth;

    let { gmail, profile_picture, created_at } = userAttributes;

    let updatedFullName = updatedFirstName + " " + updatedLastName;
    let childForStorage = `users/${userId}/profilePic`;
    if (!userId) {
      console.log("No id");
      return;
    }
    if (profile_picture === updatedProfilePic) {
      media = updatedProfilePic;
    } else {
      media = await helperFunctions.uploadImageAsync(
        updatedProfilePic,
        `${userId}`,
        childForStorage
      );
    }
    console.log("updated url" + media);
    let updateUserObj = {
      profile_picture: media,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      name: updatedFullName,
      linkedin: updatedLinkedIn,
      github: updatedGithub,
      bio: updatedBio,
    };

    try {
      apiConstant
        .getUserCollectionRef()
        .doc(userId)
        .update(updateUserObj)
        .then((snapshot) => {
          let updatedNewUser = new user(
            userId,
            updatedFullName,
            updatedFirstName,
            updatedLastName,
            updatedBio,
            updatedGithub,
            updatedLinkedIn,
            gmail,
            media,
            created_at
          );
          dispatch({
            type: EDIT_USER,
            updatedNewUser,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUserPost = () => {
  return async (dispatch, getState) => {
    let userCreatedPost = getState().auth.userCreatedPost;
    let userAttributes = getState().auth.userAttributes;
    let userCreatedPostArr = [];
    userCreatedPost = userCreatedPost ? userCreatedPost.reverse() : [];
    console.log("uooo");
    userCreatedPost.map((data, i) => {
      userCreatedPostArr.push(helperFunctions.getPostOnlyDetails(data));
    });
    console.log("oooooooooooooooooooooooooooooo");

    Promise.all(userCreatedPostArr).then(() => {
      userCreatedPostArr = userCreatedPostArr.map((data, i) => {
        return { ...data["_55"], createdBy: userAttributes };
      });

      dispatch({
        type: FETCH_USER_POST,
        userCreatedPostArr: userCreatedPostArr,
      });
    });
  };
};

export const fetchUserInterestedPost = () => {
  return async (dispatch, getState) => {
    let userInterestedPost = getState().auth.userInterestedPost;
    userInterestedPost = userInterestedPost ? userInterestedPost.reverse() : [];
    let userInterestedPostArr = [];
    userInterestedPost.map((data, i) => {
      userInterestedPostArr.push(helperFunctions.getFullPost(data));
    });

    Promise.all(userInterestedPostArr).then(() => {
      userInterestedPostArr = userInterestedPostArr.map((data, i) => {
        return { ...data["_55"] };
      });
      dispatch({
        type: FETCH_USER_INTERESTED_POST,
        userInterestedPostArr: userInterestedPostArr,
      });
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    console.log("logoutttt");
    await firebase.auth().signOut();
    await AsyncStorage.removeItem("userData");
    dispatch({ type: LOGOUT });
  };
};
