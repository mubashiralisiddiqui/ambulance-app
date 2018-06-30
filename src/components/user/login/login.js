import React, { Component } from "react";
import { loginStyles } from "./style";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { Header, FormInput, FormLabel, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { userLogin } from '../../../store/middleware/authMiddleWare'

class UserLogin extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            email: "syedharis49@gmail.com",
            password: "123456789",
            isLogin: false
        };
    }

    static navigationOptions = {
        header: null,
    }

    componentWillMount() {
        // const { navigate } = this.props.navigation
        if (this.props.isLoggedIn === true) {
            navigate('Home')
        }
        console.log('will mount', this.props.isLoggedIn);
    }

    componentDidMount() {
        // const { navigate } = this.props.navigation
        this.props.loggedIn ?
            navigate('Home')
            :
            null
    }

    _handleLogin() {
        const { navigate } = this.props.navigation
        const islogin = this.props.isLoggedIn
        let obj = {
            email: this.state.email,
            pasword: this.state.password,
            // id: this.props.deviceID
        }
        this.props.login(obj, navigate, islogin)
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <KeyboardAwareScrollView>
                    <Header
                        leftComponent={
                            <Image
                                source={{
                                    uri:
                                        "https://cdn1.iconfinder.com/data/icons/avatar-2-2/512/Salesman_2-256.png"
                                }}
                                style={{ width: 35, height: 35 }}
                            />
                        }
                        centerComponent={{
                            text: "Login",
                            style: { color: "#fff", fontFamily: 'Times New Roman', fontSize: 20 }
                        }}
                        outerContainerStyles={{ backgroundColor: "#c62828" }}
                    />
                    <View style={loginStyles.form}>
                        <View style={loginStyles.formFields}>
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                keyboardType="email-address"
                                onChangeText={txt => this.setState({ email: txt })}
                                value={this.state.email}
                                dataDetectorTypes="address"
                                inputStyle={{ fontFamily: 'times new roman' }}
                            />
                            <FormLabel>Password</FormLabel>
                            <FormInput
                                secureTextEntry={true}
                                onChangeText={txt => this.setState({ password: txt })}
                                value={this.state.password}
                                inputStyle={{ fontFamily: 'times new roman' }}
                            />
                        </View>

                        <Button
                            title="Login"
                            buttonStyle={loginStyles.loginButton}
                            // onPress={() => this._handleLogin()}
                            onPress={() => this.props.navigation.navigate('screen1')}
                            textStyle={{ fontFamily: 'times new roman', fontWeight: 'bold' }}
                        />

                        <View style={loginStyles.registerSuggestionText} >
                            <Text> Forget Password..? </Text>
                            <TouchableOpacity
                                onPress={() => navigate("screen1")}
                                // onPress={() => this.props.navigation.navigate('forgottenPasswordScreen')}
                            >
                                <Text style={{ fontWeight: "bold", marginTop: 20 }}> Tap Here To Get New One </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={loginStyles.registerSuggestionText}>
                            <Text>Not Registered</Text>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate('signupScreen')}
                                onPress={() => navigate("SignupScreen")}
                            >
                                <Text style={{ fontWeight: "bold" }}>Signup Now!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isLogin: state.AuthReducers.isLoggedIn,
        isVerified: state.AuthReducers.verified
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (payload, navigate, islogin) => { dispatch(userLogin(payload, navigate, islogin)) },
        sendemail: () => { dispatch(sendverificationemail()) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);