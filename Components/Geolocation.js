/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
/* eslint no-console: 0 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = ReactNative;

import { Actions } from 'react-native-router-flux';

var GeolocationExample = React.createClass({
  watchID: null,

  hostUrl: null,

  getInitialState: function() {
    return {
      initialPosition: {},
      lastPosition: { coords: { latitude: '', lontitude: ''}},
      error: ''
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = position;
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = position;
      this.setState({lastPosition});
    });
    this.hostUrl = 'http://ec2-54-191-149-78.us-west-2.compute.amazonaws.com:3000/api/users/' + this.props.username
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  _addLocation: function () {
    const _that = this
    fetch(this.hostUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude: this.state.lastPosition.coords.latitude,
        longitude: this.state.lastPosition.coords.longitude
        // message: "Hi there"
      })
    }).then(function () {
      Actions.getGeoLocation({username: _that.props.username})
    }).catch(function (e) {
      console.log(e)
      _that.setState({
        error: "Error in saving data"
      })
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hi {this.props.username}
        </Text>
        <Text style={styles.error}>
          {this.state.error}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          <Text> Latitude: {this.state.lastPosition && this.state.lastPosition.coords.latitude} </Text>
          <Text> Longitude: {this.state.lastPosition && this.state.lastPosition.coords.longitude} </Text>
        </Text>
        <TouchableHighlight style={{marginTop: 10}} onPress={this._addLocation}>
          <Text style={styles.button}>
            Save Location
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: '#48BBEC',
    textAlign: 'center',
    textAlignVertical: 'center',
    padding: 10,
    fontWeight: '500',
  },
  error: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#990000'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontStyle: 'italic'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  title: {
    fontWeight: "500"
  }
});

module.exports = GeolocationExample