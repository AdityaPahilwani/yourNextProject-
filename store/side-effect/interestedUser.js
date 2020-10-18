export const FETCH_INTERESTED_USERS = "FETCH_INTERESTED_USERS";
import * as firebase from "firebase/app";
import "firebase/firestore";
export const TOGGLE_INTEREST = "TOGGLE_INTEREST";
export const INSERT_USER_CREATED_POST = "INSERT_USER_CREATED_POST";
export const SET_INTERESTED_USER_DATA = "SET_INTERESTED_USER_DATA";
import * as helperFunctions from "../helper/helper";
import * as apiConstant from "../apiConstant/apiConstant";
import feed from "../../Models/feed";

export const toggleInterest = (feed, interestValue) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const { feedId } = feed;

    try {
      if (interestValue) {
        await apiConstant
          .getFetchPostRef()
          .doc(feedId)
          .update({
            interestedPeople: firebase.firestore.FieldValue.arrayUnion(userId),
          });

        await apiConstant
          .getUserCollectionRef()
          .doc(userId)
          .update({
            interestedPosts: firebase.firestore.FieldValue.arrayUnion(feedId),
          });
      } else {
        await apiConstant
          .getFetchPostRef()
          .doc(feedId)
          .update({
            interestedPeople: firebase.firestore.FieldValue.arrayRemove(userId),
          });

        await apiConstant
          .getUserCollectionRef()
          .doc(userId)
          .update({
            interestedPosts: firebase.firestore.FieldValue.arrayRemove(feedId),
          });
      }
     dispatch({ type: TOGGLE_INTEREST, interestValue, userId, feed });
    } catch (e) {
      console.log("error from toggle " + e);
    }
  };
};

export const updateUsercreatedPost = (feed) => {
  return async (dispatch, getState) => {
    const { feedId } = feed;
    const { userId } = getState().auth;
    try {
      await apiConstant
        .getUserCollectionRef()
        .doc(userId)
        .update({
          createdPosts: firebase.firestore.FieldValue.arrayUnion(feedId),
        });
      dispatch({ type: INSERT_USER_CREATED_POST, feedId, userId, feed });
    } catch (e) {
      console.log("error from updadteuser " + e);
    }
  };
};

export const getInterestedUser = (interestedPeople, feedId) => {
  return async (dispatch, getState) => {
    let interestedPeopleArr = [];

    interestedPeople.map((data, i) => {
      interestedPeopleArr.push(helperFunctions.getUser(data));
    });
    Promise.all(interestedPeopleArr).then(() => {
      index = 0;
      interestedPeopleArr.forEach((doc) => {
        interestedPeopleArr[index] = {
          ...interestedPeopleArr[index]["_55"],
          parentId: feedId,
        };
        index++;
      });
      dispatch({
        type: SET_INTERESTED_USER_DATA,
        feedInterestedUser: interestedPeopleArr,
      });
    });
  };
};
