import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    BackAndroid,
    BackHandler
} from "react-native";
import { Header, FormInput, FormLabel, Button, Icon } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signupStyles } from "./style";
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { userSignup } from '../../../store/middleware/authMiddleWare';

class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            contact: 0
        }
    }
    static navigationOptions = {
        header: null
    }
   
    signup() {
        const { navigate } = this.props.navigation
        let obj = {
            name: this.state.firstName + this.state.lastName,
            email: this.state.email,
            pasword: this.state.password,
            deviceid: this.props.deviceID,
            contact: this.state.contact
        }
        this.props.signup(obj, navigate)
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
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
                    statusBarProps={{ barStyle: "light-content" }}
                    centerComponent={{
                        text: "Signup",
                        style: { color: "#fff", fontFamily: 'times new roman', fontSize: 20 }
                    }}
                    outerContainerStyles={{ backgroundColor: "#c62828" }}
                />
                <View style={signupStyles.form}>
                    <View style={signupStyles.formFields}>
                        <View>
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                onChangeText={txt => this.setState({ firstName: txt })}
                                value={this.state.firstName}
                            />
                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                value={this.state.lastName}
                                onChangeText={txt => this.setState({ lastName: txt })}
                            />
                            <FormLabel>Email</FormLabel>
                            <FormInput
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={txt => this.setState({ email: txt })}
                            />
                            <FormLabel>Password</FormLabel>
                            <FormInput
                                secureTextEntry={true}
                                value={this.state.password}
                                onChangeText={txt => this.setState({ password: txt })}
                            />
                            <FormLabel>Contact Number</FormLabel>
                            <FormInput
                                keyboardType='numeric'
                                value={this.state.contact}
                                onChangeText={txt => this.setState({ contact: txt })}
                            />
    
                        </View>
                        <Button
                            title="Sign up"
                            buttonStyle={signupStyles.SignupButton}
                            onPress={() => this.signup()}
                            textStyle={{ fontSize: 20, fontFamily: 'times new roman' }}
                        />
                    </View>
                    <View style={signupStyles.registerSuggestionText}>
                        <Text>Already have an account ?</Text>
                        <TouchableOpacity 
                        onPress={() => navigate("LoginScreen")}
                        >
                            <Text style={{ fontWeight: "bold" }}>Login Now!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (payload, navigate) => { dispatch(userSignup(payload, navigate)) }
    }
}
export default connect(null, mapDispatchToProps)(Signup);