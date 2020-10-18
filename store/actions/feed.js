export const INSERT = "INSERT";
export const FETCH = "FETCH";
export const TURN_ON_FETCHING = "TURN_ON_FETCHING";
import * as firebase from "firebase/app";
import "firebase/firestore";
import * as sideActionHandler from "../side-effect/interestedUser";
import * as helperFunctions from "../helper/helper";
import * as apiConstant from "../apiConstant/apiConstant";
import feed from "../../Models/feed";
import { AsyncStorage } from "react-native";

// Storing UserName in feed collection because my app doesn't provide feature to edit userName
export const insert = (
  title,
  description,
  techStackArr,
  lookingFor,
  pickedMedia
) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let userObj = getState().auth.userAttributes;
    // userObj = { ...userObj, userId };
    // console.log(userObj, userId);
    let media = false;
    let randomId = Math.random() * Math.random();
    randomId = randomId + title + Math.random() + description + Math.random();
    let childForStorage = "feeds/" + userId + randomId;
    if (!userId) {
      console.log("No id");
      return;
    }
    if (pickedMedia) {
      console.log("media existss");
      media = await helperFunctions.uploadImageAsync(
        pickedMedia,
        `${userId}`,
        childForStorage
      );
      console.log("done");
    }
    let createdAt = firebase.firestore.FieldValue.serverTimestamp();

    try {
      apiConstant
        .getFetchPostRef()
        .add({
          createdBy: userId,
          title: title,
          description: description,
          lookingFor: lookingFor,
          techStack: techStackArr,
          media: media,
          createdAt: createdAt,
          interestedPeople: [],
        })
        .then((snapshot) => {
          var feedId = snapshot.id;
          var newFeed = new feed(
            userObj,
            title,
            description,
            techStackArr,
            lookingFor,
            media,
            createdAt,
            feedId,
            []
          );
          dispatch(sideActionHandler.updateUsercreatedPost(newFeed));
          dispatch({ type: INSERT, newFeed: newFeed });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

const pageLimit = 10;

export const fetchPost = (paginate) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    let lastFeedId = getState().feed.lastFeedId;
    let nothingToFetch = getState().feed.nothingToFetch;
    let isSameReq, DocumentEmpty;
    let createdById = [];
    let createdByArr = [];
    let id;
    let dataSnapshot;

    if (!nothingToFetch) {
      console.log("yooo");
      var newFeed,
        feedArr = [];
      let query;
      let lastCreatedAtPost;
      if (paginate) {
        lastCreatedAtPost = getState().feed.feeds[
          getState().feed.feeds.length - 1
        ].createdAt;

        query = apiConstant
          .getFetchPostRef()
          .orderBy("createdAt", "desc")
          .startAfter(lastCreatedAtPost)
          .limit(pageLimit);
      } else {
        query = apiConstant
          .getFetchPostRef()
          .orderBy("createdAt", "desc")
          .limit(pageLimit);
      }

      dataSnapshot = await query.get();

      if (dataSnapshot.empty) {
        DocumentEmpty = true;
        console.log("dispatcheed");
        dispatch({ type: FETCH, feeds: [], nothingToFetch: DocumentEmpty });
        return;
      }

      dataSnapshot.forEach((doc) => {
        isSameReq = lastFeedId === doc.id;
        if (isSameReq) {
          console.log("repeated and breaked");
        }
        if (!isSameReq) {
          id = doc.data().createdBy;
          createdById.push(id);
        }
      });

      createdById.map((data, i) => {
        createdByArr.push(helperFunctions.getUser(data));
      });

      Promise.all(createdByArr).then(() => {
        let index = 0;

        dataSnapshot.forEach((doc) => {
          let userObj = createdByArr[index]["_55"];

          let {
            description,
            media,
            techStack,
            title,
            lookingFor,
            createdAt,
            interestedPeople,
          } = doc.data();
          let feedId = doc.id;

          newFeed = new feed(
            userObj,
            title,
            description,
            techStack,
            lookingFor,
            media,
            createdAt,
            feedId,
            interestedPeople
          );

          feedArr.push(newFeed);
          index++;
        });

        dispatch({ type: FETCH, feeds: feedArr, nothingToFetch: isSameReq });
      });
    }
    return;
  };
};

export const paginatePost = () => {
  return async (dispatch, getState) => {
    let last = dataSnapshot.docs[dataSnapshot.docs.length - 1];
    dataSnapshot = await firebase
      .firestore()
      .collection("feeds")
      .orderBy("createdAt", "desc")
      .startAfter(last.data().createdAt)
      .limit(pageLimit)
      .get();

    dataSnapshot.forEach((doc) => {});
  };
};
