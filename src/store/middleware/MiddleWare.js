import * as DB from "../../firebase/database";
import ActionTypes from "../actions/actionsType";
import LoginRequest from "../actions/loginAct";
import LoginRequestSuccess from "../actions/loginAct";
import SignupRequest from "../actions/signupAct";
import SignupRequestSuccess from "../actions/signupAct";
import {
  OrgLoginRequest,
  OrgLoginRequestSuccess
} from "../actions/orgLoginAct";

import OrgAct from "../actions/orgAct";
import VerifyEmail from "../actions/emailAct";
import VerifyEmailSuccess from "../actions/emailAct";
import ResetPass from "../actions/resetpassAct";
import ResetPassSuccess from "../actions/resetpassAct";
import LogoutSuccess from "../actions/logoutAct";

import AmbulanceAct from "../actions/ambulanceAct";
import DriverAct from "../actions/driverAct";

import { database } from "firebase";
import driverAct from "../actions/driverAct";

export default class MiddleWare {
  // admin login
  static loginRequest(data, route) {
    console.log("dataaaaa", data);
    return dispatch => {
      // dispatch(LoginRequest())
      return DB.auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(sent => {
          // var userId = DB.auth().currentUser.uid;
          // DB.database().ref('Admin/' + userId).on('value', (data) => {
          // var obj = data.val();

          if (data.email === "admin@fyp.com") {
            dispatch(LoginRequestSuccess(data));
            // alert("successfully Login");
            console.log(data.email);
            // route.push("/admin");
          } else {
            alert("not authenticate user !");
            console.log(data.email);
          }
        })

        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var errorMessage =
            "The email address or password you entered is not valid";
          alert(errorMessage);
        });
    };
  }

  // organization login
  static orgLogin(data) {
    console.log("daadaa", data);
    return dispatch => {
      // dispatch(LoginRequest())
      return DB.auth
        .signInWithEmailAndPassword(data.email, data.password)
        .then(sent => {
          if (data.email === "admin@fyp.com") {
            alert("not authenticate user !");
            console.log(data.email);
          } else {
            dispatch(LoginRequestSuccess(data));
            alert("successfully Login");
          }
        })
        .catch(error => {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          var errorMessage =
            "The email address or password you entered is not valid";
          alert(errorMessage);
        });
    };
  }

  // organization Signup
  static orgSignup(data, route) {
    console.log("datataa", data);
    return dispatch => {
      // dispatch(SignupRequest());
      if (data.password == data.repeatPassword) {
        return DB.auth
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(send => {
            const ref = DB.database.ref("Organization/" + send.uid);
            ref.set(
              {
                uid: send.uid,
                name: data.name,
                email: data.email,
                role: "organization"
                // contactNum: data.contactNum,
              },
              success => {
                dispatch(
                  SignupRequestSuccess({
                    name: data.name,
                    email: data.email,
                    // contactNum: data.contactNum,
                    role: "organization"
                  })
                ),
                  alert("successfully signup");
                route.push("/emailverification");
              }
            );
          });
      } else {
        alert("password did not matched");
      }
    };
  }

  //signout
  static logoutUser() {
    return dispatch => {
      let authen = DB.auth;
      authen.signOut().then(() => {});
      dispatch(LogoutSuccess);
    };
  }

  // password reset
  static resetPass(data) {
    console.log("reset email", data);
    return dispatch => {
      dispatch(ResetPassSuccess(data));
      var emailAddress = data.email;
      DB.auth
        .sendPasswordResetEmail(emailAddress)
        .then(function() {
          // Email sent.
          alert("Email Successfully Sent");
        })
        .catch(function(error) {
          // An error happened.
          var errorMessage = "The email address you entered is not Registered";
          alert(errorMessage);
        });
    };
  }
  // email verification
  static verifyEmail(data) {
    console.log("verify email", data);
    return dispatch => {
      var user = DB.auth.currentUser;

      user
        .sendEmailVerification()
        .then(function() {
          var emailAddress = data.email;
          dispatch(VerifyEmail(data));
          console.log("swds", emailAddress);
          // Email sent.
          alert("Email Sent");
        })
        .catch(function(error) {
          console.log("Error", error);
          // An error happened.
        });
    };
  }

  // add ambulances
  static sendAmbData(data) {
    console.log("send data", data);
    return dispatch => {
      let database = DB.database.ref().child("Ambulance");
      database.push(data);
      dispatch(AmbulanceAct.addAmbulance(data));
    };
  }

  //view ambulance list
  static fetchAmbData() {
    console.log("fetching data");
    return dispatch => {
      let arrdata = [];
      let dataabase = DB.database.ref("/Ambulance/");
      dataabase.on("value", object => {
        let data = object.val();
        // arrdata.push(data[a].ambulanceInfo);
        for (var a in data) arrdata.push(data[a]);

        dispatch(AmbulanceAct.gettingData(arrdata));
        // console.log("data", data)

        console.log("fetched data", arrdata);
      });
    };
  }

  //add drivers
  static driverSignup(data) {
    console.log("datataa", data);
    return dispatch => {
      if (data.password == data.repeatPassword) {
        return DB.auth
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(send => {
            const ref = DB.database.ref("Driver/" + send.uid);
            ref.set(
              {
                uid: send.uid,
                name: data.name,
                email: data.email,
                role: "Driver"

                // contactNum: data.contactNum,
              },
              success => {
                dispatch(
                  DriverAct.addDriver({
                    name: data.name,
                    email: data.email
                    // contactNum: data.contactNum,
                  })
                ),
                  alert("successfully signup");
                // route.push('/emailverification');
              }
            );
          });
      } else {
        alert("password did not matched");
      }
    };
  }

  // fetch driver data

  static fetchDriverData() {
    console.log("fetching data");
    return dispatch => {
      let arrdata = [];
      let dataabase = DB.database.ref("/Driver/");
      dataabase.on("value", object => {
        let data = object.val();
        // arrdata.push(data[a].ambulanceInfo);
        for (var b in data) arrdata.push(data[b]);

        dispatch(DriverAct.getDriver(arrdata));
        console.log("fetched data", arrdata);
      });
    };
  }

  // fetch organization data

  static fetchOrgData() {
    console.log("fetching Data");
    return dispatch => {
      let arrdata = [];
      let dataabase = DB.database.ref("/Organization/");
      dataabase.on("value", object => {
        let data = object.val();
        // arrdata.push(data[a].ambulanceInfo);
        for (var x in data) arrdata.push(data[x]);

        dispatch(OrgAct.getOrg(arrdata));
        console.log("fetched data", arrdata);
      });
    };
  }
}
