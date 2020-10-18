import feed from "../../Models/feed";
import { LOGOUT, EDIT_USER } from "../actions/auth";
import { INSERT, FETCH, TURN_ON_FETCHING } from "../actions/feed";
import {
  TOGGLE_INTEREST,
  SET_INTERESTED_USER_DATA,
} from "../side-effect/interestedUser";

const initialState = {
  feeds: [],
  lastFeedId: false,
  nothingToFetch: false,
  selectedFeedId: false,
  feedInterestedUser: [],
};

export default (state = initialState, action) => {
  let lastFeedId;
  switch (action.type) {
    case INSERT:
      let newFeed = action.newFeed;
      newFeed = [newFeed, ...state.feeds];
      return {
        ...state,
        feeds: newFeed,
      };
    case FETCH:
      let newFeeds = action.feeds;
      let nothingToFetch = action.nothingToFetch;

      if (!nothingToFetch) {
        lastFeedId = newFeeds[newFeeds.length - 1].feedId;
      } else {
        lastFeedId = state.lastFeedId;
      }
      return {
        ...state,
        feeds: [...state.feeds, ...newFeeds],
        lastFeedId,
        nothingToFetch,
      };
    case TOGGLE_INTEREST:
      let oldFeeds = [...state.feeds];
      let newInterestArray = [];
      let tempObj;
      let bool;
      let { interestValue, feed, userId } = action;
      let { feedId } = feed;

      let index = oldFeeds.findIndex((e) => {
        // console.log(e);
        return e.feedId === feedId;
      });
      if (index === -1) {
        console.log("breaakeedd");
        return {
          ...state,
        };
      }
      console.log("feedId is ", feedId, index);
      tempObj = oldFeeds[index];
      let { interestedPeople } = tempObj;
      let tempinterestedPeople = interestedPeople;
      bool = tempinterestedPeople.includes(userId);
      if (bool) {
        tempinterestedPeople = tempinterestedPeople.filter((e) => {
          return e !== userId;
        });
      }
      if (interestValue) {
        tempinterestedPeople.push(userId);
      }
      interestedPeople = tempinterestedPeople;
      tempObj = { ...tempObj, interestedPeople, interestedPeople };
      oldFeeds[index] = tempObj;
      return {
        ...state,
        feeds: oldFeeds,
      };

    case SET_INTERESTED_USER_DATA:
      let newfeedInterestedUser = [
        ...state.feedInterestedUser,
        ...action.feedInterestedUser,
      ];
      return {
        ...state,
        feedInterestedUser: newfeedInterestedUser,
      };
    case EDIT_USER:
      let newUserobj = action.updatedNewUser;
      let id = newUserobj.userId;
      let editedFeeds = [];
      if (state.feeds) {
        editedFeeds = state.feeds.map((data, i) => {
          if (data.createdBy.userId === id) {
            return { ...data, createdBy: newUserobj };
          }
          return { ...data };
        });
      }
      return {
        ...state,
        feeds: editedFeeds,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
