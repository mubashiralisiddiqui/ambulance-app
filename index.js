import { AppRegistry } from 'react-native';
import { Provider } from "react-redux";
import React from 'react';
import { View, Text } from 'react-native'
import Login from './src/components/user/login/login'
import * as firebase from "firebase";
import store from "./src/store";

var config = {
    apiKey: "AIzaSyBwGjq0FA_rCc-IvFk3XmrQ34NR_lGZP98",
    authDomain: "fyp-project-9b5af.firebaseapp.com",
    databaseURL: "https://fyp-project-9b5af.firebaseio.com",
    projectId: "fyp-project-9b5af",
    storageBucket: "fyp-project-9b5af.appspot.com",
    messagingSenderId: "58506419089"
};
firebase.initializeApp(config);


import PrimaryNav from './Navigation/AppNavigation';
export default class App extends React.Component {

    render() {
        // const abc = abc(this.props.islogin);
        return (
            <Provider store={store}>
                <PrimaryNav />
            </Provider>
        );
    }
}


AppRegistry.registerComponent('ambulanceapp', () => App);
