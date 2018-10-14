import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './LoginPage.js';
import styled from 'styled-components';
import firstQR from './firstQR.png';
import secondQR from './secondQR.png';


const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top:3%;
  padding-left:2%;
`;
const DivBG = styled.div`
height: 100vh;
background-image: linear-gradient(#FFA614, #FFDD2C);
`;

const EventPhoto = styled.img`
  height: 35vh;
  margin-left: 2%;
  margin-top: 2%;
`;
const EventDate = styled.h2`
  margin-left: 2%;
`;
const EventDesc = styled.h3`
  margin-left:2%;
`;
const EventName = styled.h1`
  font-size: 6.5em;
  margin-left:2%;
  margin-bottom:0;
`;
const HostName = styled.h2`
  margin-top:0;
  margin-left:4%;
`;

const PhotoDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-right:5%
`;
const EventHostDescDiv = styled.div`
   display:flex;
   flex-direction:column;
`;
const ActionQRDiv = PhotoDateDiv.extend`
  margin-left:5%;
  padding-right:5%;
  margin-right:10%;
`;
const QRButtonDiv = styled.div`
  display:flex;
  flex-direction:row;
`;
const QRimg = styled.img`
  height: 23vh;
  align-self: center;
  margin-bottom:5%;
  margin-right:5%;
`;
const QRToggle = styled.div`
  margin-top:23%;
`;

export default class App extends Component {
  render() {
    const Dash = () => (
      <DivBG>
        <ContentContainer>
          <PhotoDateDiv>
            <EventPhoto src ="https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/MHacks.width-808.png" alt = "mhacks"/>
            <EventDate>October 12-14, 2018</EventDate>
          </PhotoDateDiv>
          <EventHostDescDiv>
            <EventName>MHacks
            </EventName>
            <HostName>University of Michigan
            </HostName>

          </EventHostDescDiv>
          <ActionQRDiv>
            <QRButtonDiv>
              <QRimg src= {firstQR} alt = 'QR'/>
                <div class="ui toggle checkbox"
                  style = {{
                    width: 290,
                  }}
                  >
                  <div>
                    <input type="checkbox" name="public"/>
                    <label>Enable AttendanceQR Code</label>
                  </div>
                </div>
              </QRButtonDiv>


            <QRButtonDiv>
              <QRimg src= {secondQR} alt = 'QR'/>
                <div class="ui toggle checkbox"
                  style = {{
                    width: 290,
                  }}
                  >
                  <div>
                    <input type="checkbox" name="public"/>
                    <label>Enable Messaging QR Code</label>
                  </div>
                </div>
            </QRButtonDiv>
          </ActionQRDiv>
        </ContentContainer>
        <EventDesc> This is a hackathon run by U Michigan and sponsored by MLH,
           Facebook, Amazon, Firebase and other large tech companies.
        </EventDesc>
      </DivBG>
    );
    return (
    <Router>
      <div>
        <Route exact path = '' component = {LoginPage}/>
        <Route exact path = '/Dash' component = {Dash}/>
      </div>
    </Router>
    );
  }
}
