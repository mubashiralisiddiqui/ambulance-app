import React from "react";
import { Text, Animated, Easing } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import LoginScreen from "../Containers/LoginScreen";
import SignupScreen from "../Containers/SignupScreen";
import ForgottenPasswordScreen from "../Containers/ForgottenPasswordScreen";
import Screen1 from "../Containers/Screen1";
import Screen2 from "../Containers/Screen2";
import Screen3 from "../Containers/Screen3";
import DrawerContainer from "../Containers/DrawerContainer";
import {
  Welcome,
  UserDashboard,
  UserLogin,
  UserSignup,
  ForgetPass,
  DriverLogin,
  DriverSignup,
  DriverDashboard,
  Profile
} from "../src/components";
import Home from "../App";
import { Icon } from "native-base";

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

// user drawer stack
const UserDrawerStack = DrawerNavigator(
  {
    screen1: { screen: Screen1 },
    screen2: { screen: Screen2 },
    screen3: { screen: Screen3 },
    screen4: { screen: UserDashboard }
  },
  {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
  }
);

// driver drawer stack
const DriverDrawerStack = DrawerNavigator(
  {
    screen1: { screen: Screen1 },
    screen3: { screen: Screen3 },
    screen4: { screen: DriverDashboard }
  },
  {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
  }
);

const drawerButton = navigation => (
  <Icon
    style={{ paddingLeft: 20, color: "white" }}
    onPress={() => {
      // Coming soon: navigation.navigate('DrawerToggle')
      // https://github.com/react-community/react-navigation/pull/2492
      if (navigation.state.index === 0) {
        navigation.navigate("DrawerOpen");
      } else {
        navigation.navigate("DrawerClose");
      }
    }}
    name="menu"
  />
);

const UserDrawerNavigation = StackNavigator(
  {
    UserDrawerStack: { screen: UserDrawerStack }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#c62828" },
      // title: 'Welcome!',
      headerTintColor: "white",
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation)
    })
  }
);

const DriverDrawerNavigation = StackNavigator(
  {
    DriverDrawerStack: { screen: DriverDrawerStack }
  },
  {
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#c62828" },
      // title: 'Welcome!',
      headerTintColor: "white",
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation)
    })
  }
);

// login stack
const LoginStack = StackNavigator(
  {
    HomeScreen: { screen: Home },
    loginScreen: { screen: UserLogin },
    driverloginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen },
    forgottenPasswordScreen: {
      screen: ForgottenPasswordScreen,
      navigationOptions: { title: "Forgot Password" }
    }
  },
  {
    headerMode: "float",
    navigationOptions: {
      headerStyle: { backgroundColor: "#E73536" },
      title: "You are not logged in",
      headerTintColor: "white"
    }
  }
);

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    // loginStack: { screen: LoginStack },
    // userdrawerStack: { screen: UserDrawerNavigation },
    // driverdrawerStack: { screen: DriverDrawerNavigation }
    HomeScreen: { screen: Home },
    loginScreen: { screen: UserLogin },
    driverloginScreen: { screen: LoginScreen },
    signupScreen: { screen: SignupScreen },
    forgottenPasswordScreen: {
      screen: ForgottenPasswordScreen,
      navigationOptions: { title: "Forgot Password" }
    },
    screen1: { screen: Screen1 },
    screen2: { screen: Screen2 },
    screen3: { screen: Screen3 },
    screen4: { screen: UserDashboard }
  },
  {
    // Default config for all screens
    headerMode: "screen",
    title: "Main",
    initialRouteName: "HomeScreen",
    // transitionConfig: noTransitionConfig
  }
);

export default PrimaryNav;
