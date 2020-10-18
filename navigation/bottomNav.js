import React from "react";

import { Ionicons, Feather } from "@expo/vector-icons";

import feedNavigator from "./feedNav";
import userNavigator from "./userNavigation";
import FEED_DETAIL_SCREEN from "../SCREENS/Feed/feedDetail";
import NEW_POST from "../SCREENS/Feed/newPost";
import searchScreen from "../SCREENS/Feed/Search";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../Constants/Colors";

const TabNav = ({ navigation, route }) => {
  const IconNames = ["md-home", "md-add", "md-search", "user"];
  let Tab;

  Tab = createBottomTabNavigator();

  let tabBarStyle;

  // if (route && route.state && route.state.history) {
  //   const currentRoute = route.state.history[route.state.history.length - 1];
  //   const currentRouteName = currentRoute.key.split("-")[0];
  //   const currentNestedNavigator = route.state.routes.find(
  //     (route) => route.name === currentRouteName
  //   );
  //   let currentNestedNavigatorIndex;

  //   if (currentNestedNavigator && currentNestedNavigator.state) {
  //     currentNestedNavigatorIndex = currentNestedNavigator.state.index;

  //     if (currentNestedNavigatorIndex && currentNestedNavigatorIndex > 0) {
  //       tabBarStyle = { display: "none" };
  //     }
  //   }
  // }

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        style: tabBarStyle,
      }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen
        name="feed"
        component={feedNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={IconNames[0]}
                size={32}
                color={focused ? Colors.primary : "grey"}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="add"
        component={NEW_POST}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={IconNames[1]}
                size={32}
                color={focused ? Colors.primary : "grey"}
              />
            );
          },
        })}
      />
      {/* <Tab.Screen
        name="search"
        component={searchScreen}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name={IconNames[2]}
                size={32}
                color={focused ? Colors.primary : "grey"}
              />
            );
          },
        })}
      /> */}
      <Tab.Screen
        name="user"
        component={userNavigator}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Feather
                name={IconNames[3]}
                size={32}
                color={focused ? Colors.primary : "grey"}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNav;

// function MyTabBar({ state, descriptors, navigation }) {
//     const focusedOptions = descriptors[state.routes[state.index].key].options;

//     if (focusedOptions.tabBarVisible === false) {
//       return null;
//     }
//     return (
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <View
//           style={{
//             // position: "absolute",
//             bottom: 10,
//             flexDirection: "row",
//             justifyContent: "center",
//             alignItems: "center",
//             height: 60,
//             backgroundColor: "white",
//             borderRadius: 15,
//             width: "95%",
//             elevation: 5,
//             borderWidth: 0.6,
//             shadowColor: "#000",
//             shadowOffset: {
//               width: 1,
//               height: 1,
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 10,
//           }}
//         >
//           {state.routes.map((route, index) => {
//             const { options } = descriptors[route.key];

//             const IconNames = ["md-home", "md-add", "md-search", "user"];

//             const isFocused = state.index === index;
//             const onPress = () => {
//               const event = navigation.emit({
//                 type: "tabPress",
//                 target: route.key,
//                 canPreventDefault: true,
//               });

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name);
//               }
//             };

//             const onLongPress = () => {
//               navigation.emit({
//                 type: "tabLongPress",
//                 target: route.key,
//               });
//             };
//             let Icon = Ionicons;
//             if (index === 3) {
//               Icon = Feather;
//             }
//             return (
//               <TouchableOpacity
//                 key={index}
//                 activeOpacity={1}
//                 accessibilityRole="button"
//                 accessibilityStates={isFocused ? ["selected"] : []}
//                 accessibilityLabel={options.tabBarAccessibilityLabel}
//                 testID={options.tabBarTestID}
//                 onPress={onPress}
//                 onLongPress={onLongPress}
//                 style={{
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flex: 1,
//                 }}
//               >
//                 <Icon
//                   name={IconNames[index]}
//                   size={32}
//                   color={isFocused ? Colors.primary : "grey"}
//                 />
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//     );
//   }
