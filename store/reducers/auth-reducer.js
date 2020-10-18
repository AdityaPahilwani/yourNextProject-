import {
  AUTHENTICATE,
  LOGOUT,
  FETCH_USER_POST,
  FETCH_USER_INTERESTED_POST,
  EDIT_USER,
} from "../actions/auth";
import {
  TOGGLE_INTEREST,
  INSERT_USER_CREATED_POST,
} from "../side-effect/interestedUser";

import user from "../../Models/user";
let defUser = new user(false, false, false, false, false, false, false, false);
const initialState = {
  userId: false,
  userAttributes: defUser,
  userCreatedPost: [],
  userCreatedPostArr: [],
  userInterestedPost: [],
  userInterestedPostArr: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      console.log(action);
      return {
        userId: action.userId,
        userAttributes: action.userAttr,
        userCreatedPost: action.createdPosts,
        userInterestedPost: action.interestedPosts,
      };
    case EDIT_USER:
      let newUserobj = action.updatedNewUser;
      let editedCreatedPostArr = [];
      if (state.userCreatedPostArr) {
        editedCreatedPostArr = state.userCreatedPostArr.map((data, i) => {
          return { ...data, createdBy: newUserobj };
        });
      }
      return {
        ...state,
        userAttributes: newUserobj,
        userCreatedPostArr: editedCreatedPostArr,
      };
    case TOGGLE_INTEREST:
      let oldInterestArray = [...state.userInterestedPost];
      let InterestFullArray = state.userInterestedPostArr
        ? [...state.userInterestedPostArr]
        : [];

      let newInterestFullArray = [];
      let { interestValue, feed, userId } = action;
      const { feedId } = feed;
      let newInterestArray = [];
      if (interestValue) {
        newInterestArray = [...oldInterestArray, feedId];
        InterestFullArray.unshift(feed);
      } else {
        newInterestArray = oldInterestArray.filter((item) => item !== feedId);
        InterestFullArray = InterestFullArray.filter(
          (item) => item.feedId !== feedId
        );
      }

      return {
        ...state,
        userInterestedPost: newInterestArray,
        userInterestedPostArr: InterestFullArray,
      };

    case INSERT_USER_CREATED_POST:
      let newfeed = action.feed;
      let id = newfeed.feedId;
      let newUserCreatedPost = [id, ...state.userCreatedPost];
      let newuserCreatedPostArr = [];
      if (state.userCreatedPostArr) {
        newuserCreatedPostArr = state.userCreatedPostArr;
        newuserCreatedPostArr.unshift(newfeed);
      }
      console.log(newUserCreatedPost);
      return {
        ...state,
        userCreatedPost: newUserCreatedPost,
        userCreatedPostArr: newuserCreatedPostArr,
      };

    case FETCH_USER_POST:
      return {
        ...state,
        userCreatedPostArr: action.userCreatedPostArr,
      };
    case FETCH_USER_INTERESTED_POST:
      return {
        ...state,
        userInterestedPostArr: action.userInterestedPostArr,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
