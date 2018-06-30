import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, Tab, Tabs, TabHeading, Text } from 'native-base';
import Map1 from './../Map/map1';
import Map2 from './../Map/map2';
import { NavigationActions } from 'react-navigation';
import Information from 'react-native-vector-icons/MaterialIcons'

class UserDashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'Dashboard',
    drawerIcon: () => (
      <Image
        source={{uri: `https://dummyimage.com/60x60/000/fff.jpg&text=1`}}
        style={{width: 30, height: 30, borderRadius: 15}}
      />
    )
  }
 render() {
    const { navigate } = this.props.navigation;
    console.log("navigate", navigate)

    return (
      <Container>
{/*        <Header
        style={{ backgroundColor: '#c62828' }}
        hasTabs>
          <Left>
            <Button transparent>
              <Icon
              onPress={() => navigate('Home')}
              type = "FontAwesome"
              name='menu' />
            </Button>
          </Left>
          <Right>
            <Button transparent>
            <Icon onPress={() => navigate('drawerStack')} type="FontAwesome" name="home" />
            </Button>
          </Right>          
</Header>*/}
        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor: '#c62828'}}>
          <Text  style={{color: '#ffffff'}} >Normal</Text><Icon style={{color: '#ffffff'}} type="FontAwesome" name="ambulance" /></TabHeading>}>
            <Map1 />
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#c62828'}}>
          <Text  style={{color: '#ffffff'}} >Emergency</Text><Icon style={{color: '#ffffff'}} type="FontAwesome" name="ambulance" /></TabHeading>}>
            <Map2 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default (UserDashboard);