import React, { Component } from "react";
import { ForgetPassStyles } from "./style";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ToastAndroid,
    BackAndroid,
    BackHandler,
    ImageBackground
} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { FormInput, FormLabel,  } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import { sendRessetemail } from '../../../store/middleware/authMiddleWare'

class ForgetPass extends React.Component{
    constructor() {
        super();
        this.state = {
            email: "",
        };
    }
        
    static navigationOptions = {
        header: null
    }

    // componentWillMount() {
    //     BackAndroid.addEventListener('hardwareBackPress', function() {
    //     var _this = this;
    //     if(!this.state.backPress) {
    //     ToastAndroid.show('Back again to exit', ToastAndroid.SHORT);
    //     this.setState({backPress:true});
    //     setTimeout(function() {
    //     _this.setState({backPress:false});
    //     },2500);
    //     } else {
    //     return false;
    //     }
    //     return true;
    //     }.bind(this));
    // }
    
    _handleResset() {
        let obj = {
            email: this.state.email,
        }
        this.setState({email: ""});
        console.log("reseting", obj);
        // this.props.sendmail(obj);
    }
 
    render(){
        const { navigate } = this.props.navigation
        console.log("navigate", navigate)

        return(
            <KeyboardAwareScrollView >
            
            <Header style = {{ backgroundColor: '#c62828'}}>
                <Left>
                    <Button transparent onPress={() => navigate('LoginScreen')} >
                    <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body>
                    <Title style = {{color: "#fff",  fontFamily: 'times new roman', fontSize: 20}}> Reset Password </Title>
                </Body>
            </Header>
            <View style={ForgetPassStyles.form}>
                <View style={ForgetPassStyles.formFields}>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        keyboardType="email-address"
                        dataDetectorTypes="address"
                        onChangeText={txt => this.setState({ email: txt })}
                        value={this.state.email}
                        inputStyle={{  fontFamily: 'times new roman'}}
                    />
                </View>

                <Button
                    style={ForgetPassStyles.SubmitButton}
                    // onPress={() => this._handleResset()}
                >
                <Text style = {{  fontFamily: 'times new roman', fontWeight: 'bold' ,color: 'white', left: 120 }}>Submit</Text>
                </Button>
                <View style={ForgetPassStyles.registerSuggestionText}>
                    <Text>Tap Here </Text>
                    <TouchableOpacity onPress={() => navigate("LoginScreen")}>
                        <Text style={{ fontWeight: "bold" }}>Login Now!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        isResset: state.AuthReducers.resset
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // login: (payload, navigate) => { dispatch(userLogin(payload, navigate)) },
        // sendmail: (data) => dispatch(sendRessetemail(data))

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPass);