import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const Centred = styled.div`
  align-self: center;
  display: flex;
  align-self: center;
  flex-direction:column;
`;
const NavButtons = styled.div`
align-self: center;
margin:1%;
`;
const IMG = styled.img`
  margin-top:8%;
  border-radius:75%;
  align-self: center;
`;
const DivBG = styled.div`
height: 100vh;
background-image: linear-gradient(#FFA614, #FFDD2C);
`;

export default class LoginPage extends Component {
  render() {
    return (
      <DivBG>
        <Centred>
          <IMG src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXYJLCzHPH4xDFZQB9iXY8rxZShd1THCDjFSUFq8g1EFiU_JOrQQ" alt = "tech pic"/>
          <NavButtons>
            <Link to = {'/Dash'}>
            <Button animated color = 'facebook'>
              <Button.Content visible>Sign In With Facebook</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            </Link>
          </NavButtons>
          <NavButtons>
            <Link to = {'/Dash'}>
              <Button animated color='green'>
                <Button.Content visible>Log In</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Link>
          </NavButtons>
        </Centred>
      </DivBG>
    );
  }
}
