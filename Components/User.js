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
      error: ''
    }

    this._onSubmit = this._onSubmit.bind(this)
  }

  _onSubmit() {
    if (this.state.username.length === 0) {
      this.setState({
        error: 'Please enter your name'
      })
    } else {
      Actions.addGeoLocation({username: this.state.username})
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          {this.state.error}
        </Text>

        <TextInput
          ref="yourName"
          autoCapitalize={"words"}
          maxLength={30}
          style={{height: 45, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(name) => this.setState({username: name})}
          value={this.state.yourName}
          autoFocus={true}
          returnKeyType="next"
          placeholder="Your Name" />

          <TouchableHighlight style={{marginTop: 10}} onPress={this._onSubmit}>
            <Text style={styles.button}>
              Next
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
