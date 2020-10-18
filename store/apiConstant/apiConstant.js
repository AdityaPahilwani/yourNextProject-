import * as firebase from "firebase/app";
import "firebase/firestore";

export const getUserCollectionRef = () => {
  return firebase.firestore().collection("users")
};

export const getFetchPostRef = () => {
  return firebase.firestore().collection("feeds")
};
