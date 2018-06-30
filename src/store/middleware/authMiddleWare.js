import { AuthAction } from '../actions/authActions';
import { ToastAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'

export const userLogin = (obj, navigate, islogin) => {
    console.log(obj)
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(obj.email, obj.pasword)
            .then((user) => {
                var user = firebase.auth().currentUser;
                var userId = firebase.auth().currentUser.uid;
                console.log("verified", user.emailVerified)
                firebase.database().ref('users/' + userId).on('value', (data) => {
                    var obj = data.val();
                    console.log("user===>", user, obj)
                    if (user.emailVerified === true) {
                        dispatch(AuthAction.userLogin(obj))
                        ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
                        navigate('screen1');
                        AsyncStorage.setItem('currentUser', JSON.stringify({ userId }));

                    }
                    else {
                        dispatch(AuthAction.verifyemail())
                        ToastAndroid.show('you have not verified your email!', ToastAndroid.SHORT);
                        navigate('SignedOut')
                    }
                })
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}

export const userSignup = (obj, navigate) => {
    return dispatch => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(obj.email, obj.pasword)
            .then(() => {
                var user = firebase.auth().currentUser;
                console.log('user', user)
                user.sendEmailVerification().then((res) => {
                    alert("an email has been sent to your mail acoount please verfiy")
                    // user.emailVerified()
                    console.log(user.emailVerified)
                    var userId = firebase.auth().currentUser.uid;
                    let userDetails = {
                        uid: userId,
                        email: obj.email,
                        name: obj.name,
                        contactNum: obj.contact
                    };
                    firebase
                        .database()
                        .ref("users/" + userId)
                        .set(userDetails).then(() => {
                            ToastAndroid.show("SIGNUP SUCCESSFUL !", ToastAndroid.SHORT);
                            navigate("SignedOut");

                        }).catch((error) => {
                            console.log("Error during user creating on firebase", error);
                        });

                }).catch((err) => {
                    alert(err)
                })
                // Email sent.
            }).catch(function (error) {
                alert(error)
            });
    }
}
export const sendverificationemail = () => {
    return dispatch => {
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(() => {
            alert('email is havebeen sent check your email')
        })
    }
}

export const sendRessetemail = (data) => {
    return dispatch => {
            dispatch(AuthAction.resetPass(data));
            var emailAddress = data.email;
            console.log('email', emailAddress);
            firebase.auth().sendPasswordResetEmail(emailAddress)
              .then(function() {
                ToastAndroid.show("Email Sent!", ToastAndroid.SHORT);  
              })
              .catch(error => {
                ToastAndroid.show(error, ToastAndroid.SHORT);
              });
    };
}
export const logout = (navigate) => {
    return dispatch => {
        firebase.auth().signOut().then(function () {
            dispatch(AuthAction.logout())
            ToastAndroid.show("SignOut SUCCESSFUL !", ToastAndroid.SHORT);// Sign-out successful.
            navigate("SignedOut");

        }).catch(function (error) {
            // An error happened.
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }
}
