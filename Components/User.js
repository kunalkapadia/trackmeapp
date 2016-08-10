import React, {
  Component,
  PropTypes,
} from 'react';

import { TextInput, View, StyleSheet, Text, TouchableHighlight } from 'react-native'

import { Actions } from 'react-native-router-flux';

class User extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onSubmit() {
    const that = this
    this.hostUrl = 'http://ec2-54-191-149-78.us-west-2.compute.amazonaws.com:3000/api/users/signin'

    if (this.state.username.length === 0 || this.state.password.length === 0) {
      this.setState({
        error: 'Your username or password is empty'
      })
    } else {
      fetch(this.hostUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        if (data.message === "no such user exists") {
          that.setState({
            error: "Error in authentication"
          })
        } else {
          Actions.addGeoLocation({username: that.state.username})
        }
      }).catch(function (e) {
        console.log(e)
        that.setState({
          error: "Error in authentication"
        })
      })
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          {this.state.error}
        </Text>

        <TextInput
          ref="username"
          autoCapitalize={"words"}
          maxLength={30}
          style={{height: 45, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username: username})}
          value={this.state.username}
          autoFocus={true}
          returnKeyType="next"
          placeholder="Username" />

        <TextInput
          ref="password"
          autoCapitalize={"words"}
          maxLength={30}
          style={{height: 45, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}
          returnKeyType="next"
          placeholder="Password" />

        <TouchableHighlight style={{marginTop: 10}} onPress={this._onSubmit}>
          <Text style={styles.button}>
            Signup
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={{marginTop: 10}} onPress={this._onSubmit}>
          <Text style={styles.button}>
            Login
          </Text>
        </TouchableHighlight>
      </View>

    );
  }
}

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
  }
});

export default User;
