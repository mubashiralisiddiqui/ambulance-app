import React from 'react';
import { View, Text, Image } from 'react-native';
// import { Button, Header, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import SplashScreen from 'react-native-splash-screen'

// import  font from '../../font/Fonts'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

    }
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" style={[{ tintColor: 'red' }]} />
        ),
        header: null
    };
    
    render() {
        // var navigate  = this.props.navigation.navigate

        const { navigate } = this.props.navigation;
        console.log("navigate", navigate)
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#ffff' }}>
            <Header style = {{ backgroundColor: '#c62828'}}>
                    <Left>
                        <Button transparent>
                        <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Ambulance App</Title>
                    </Body>
            </Header>
                    
                <View style={{ justifyContent: 'center', flex: 1 }}>
                   {/* <Image
                        source={require('../../../images/cup.png')}
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                   />*/}
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 35, color: '#5A5E60', fontFamily: 'thickdeco' }}>
                        WELCOME TO AMBULANCE APP
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                        <Icon type="FontAwesome" name='info' color='#95989A' size={20} />
                        <Text style={styles.description}>
                            Which type of Ambulance Service you Want ?
                        </Text>
                    </View>
                    <Text style={styles.description}>Select from Here.</Text>

                    <Button 
                        iconLeft
                        style={{
                            backgroundColor: '#c62828', width: 150, height: 50,marginLeft:'auto',
                            marginRight:'auto',
                            marginTop: 20
                        }}
                        onPress={() => { navigate('Dashboard') }}>
                        <Icon name='home' />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Roboto-Bold' }}
                        >Book Your Ride</Text>
                    </Button>
                    
                </View>
            </View>
        )
    }
}
const styles = {
    description: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 15,
        color: '#76797C',
        marginLeft: 5,
        fontFamily: 'Roboto-Light'
    }
}