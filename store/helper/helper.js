import * as firebase from "firebase/app";
import "firebase/firestore";
import * as apiConstant from "../apiConstant/apiConstant";
import user from "../../Models/user";
import feed from "../../Models/feed";

export const getUser = async (userId) => {
  return new Promise(async (resolve) => {
    try {
      const dataSnapshot = await apiConstant
        .getUserCollectionRef()
        .doc(userId)
        .get();
      let res = dataSnapshot.data();
      // console.log(res);
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
      } = res;
      let User = new user(
        userId,
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
      resolve(User);
    } catch (err) {
      console.log("error is ", err);
    }
  });
};

export const getFullPost = async (feedId) => {
  return new Promise(async (resolve) => {
    getPostOnlyDetails(feedId).then((res) => {
      let {
        createdBy,
        description,
        media,
        techStack,
        title,
        lookingFor,
        createdAt,
        interestedPeople,
      } = res;
      getUser(createdBy).then((userObj) => {
        let Feed = new feed(
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

        resolve(Feed);
      });
    });
  });
};

export const getPostOnlyDetails = async (feedId) => {
  return new Promise(async (resolve) => {
    try {
      const dataSnapshot = await apiConstant
        .getFetchPostRef()
        .doc(feedId)
        .get();
      let res = dataSnapshot.data();
      let {
        createdBy,
        description,
        media,
        techStack,
        title,
        lookingFor,
        createdAt,
        interestedPeople,
      } = res;
      console.log(createdBy);
      let Feed = new feed(
        createdBy,
        title,
        description,
        techStack,
        lookingFor,
        media,
        createdAt,
        feedId,
        interestedPeople
      );
      resolve(Feed);
    } catch (e) {
      console.log("error iss ", e);
    }
  });
};

export const uploadImageAsync = async (uri, storageRef, child) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref(storageRef).child(child);
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
};

// export const turnOnFetching = () => {
//   return (dispatch) => {
//     dispatch({ type: TURN_ON_FETCHING });
//   };
// };
