import React, { Component } from 'react';
import { Container, Header, Content, Item, Input } from 'native-base';

export default class Map2 extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Item>
            <Input placeholder="Underline Textbox" />
          </Item>
        </Content>
      </Container>
    );
  }
}