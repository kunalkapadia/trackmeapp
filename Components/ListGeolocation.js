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
  ScrollView
} = ReactNative;

var GeolocationExample = React.createClass({
  getInitialState: function() {
    return {
      locations: []
    };
  },

  componentWillMount: function() {
    const that = this;
    this.hostUrl = 'http://ec2-54-191-149-78.us-west-2.compute.amazonaws.com:3000/api/users/' + this.props.username
    fetch(this.hostUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        that.setState({
          locations: data.locations
        })
      })
      .catch(function (err) {
        that.setState({
          error: 'Cannot fetch locations'
        })
      })
  },

  render: function() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          {
            this.state.locations.map(function (location) {
              return (
                <View key={location._id} style={{padding: 10}}>
                  <Text>latidude: {location.latitude}</Text>
                  <Text>longitude: {location.longitude}</Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
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