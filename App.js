import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebaseConfig from "./config";
import firebase from 'firebase';

import NAVIGATION from "./navigation/NAVIGATION";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth-reducer";
import feedReducer from "./store/reducers/feed";

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }
  const rootReducer = combineReducers({
    auth: authReducer,
    feed: feedReducer,
  });
  console.disableYellowBox = true;
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NAVIGATION />
    </Provider>
  );
}

// import { createStore, combineReducers, applyMiddleware } from "redux";
// import { Provider } from "react-redux";

// import createSagaMiddleware from "redux-saga";

// import authReducer from "./STORE-01/REDUCER/authReducer";

// import rootSaga from "./STORE-01/SAGA/ROOTSAGA/rootSaga";
// // import feedReducer from "./store/reducers/feed";

// export default function App() {
//   useEffect(() => {
//     firebase.initializeApp(firebaseConfig);
//     return () => {};
//   }, []);

//   const reducers = combineReducers({
//     auth: authReducer,
//   });

//   const sagaMiddleware = createSagaMiddleware();
//   const store = createStore(reducers, applyMiddleware(sagaMiddleware));
//   sagaMiddleware.run(rootSaga);

//   return (
//     <Provider store={store}>
//       <NAVIGATION />
//     </Provider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
