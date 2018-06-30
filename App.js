import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  Button,
} from "react-native-elements";

class App extends Component {
  
  static navigationOptions = {
    header: null
  }
  render() {
    
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/images.png')}
          style={{ width: 200, height: 200, borderRadius: 100, marginBottom: 50 }} />
        <Button
          title="Login As User"
          buttonStyle={styles.SignupButton}
          onPress={() => this.props.navigation.navigate('loginScreen')}
          textStyle={{fontFamily:'Georgia',color:'#659EC7',fontWeight:'bold'}}
        />
        <Button
          title="Login As Driver"
          buttonStyle={styles.SignupButton}
          onPress={() => this.props.navigation.navigate('driverloginScreen')}
          textStyle={{fontFamily:'Georgia',color:'#659EC7',fontWeight:'bold'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#E73536'

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  SignupButton: {
    backgroundColor: 'white',
    marginTop: 25,
    borderRadius: 10,
    height:50
  },
  titleStyle: {
    color: '#fff',
    fontStyle: "italic",
    fontSize: 20,
    fontFamily: 'Times New Roman'
  }
});
// const mapDispatchToProps = (dispatch) => {
//   return {
//     decviceinfo: (payload) => { dispatch(deviceIDMiddlware(payload)) }
//   }
// }

export default App;