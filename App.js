/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component {
  fblogin() {
    let that = this;
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          let thatIs = that;
          AccessToken.getCurrentAccessToken()
            .then((accessTokenData) => {
              console.log(accessTokenData, 'accessTokenData')
              const credential = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
              console.log(credential)
            })
        }
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Button onPress={this.fblogin.bind(this)} title="Facebook login"/>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
