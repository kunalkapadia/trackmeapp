import React, { Component } from 'react';
import { Router, Scene, Modal } from 'react-native-router-flux';

import Geolocation from './Geolocation';
import ListGeolocation from './ListGeolocation'
import User from './User';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="mainScreen" component={User} title="Geo Track Me" initial={true}  />
          <Scene key="addGeoLocation" component={Geolocation} title="Add Location" />
          <Scene key="getGeoLocation" component={ListGeolocation} title="List Locations" />
        </Scene>
      </Router>
    )
  }
}