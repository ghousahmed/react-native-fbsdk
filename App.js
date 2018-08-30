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
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'react-native-aws-cognito-js';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let username = "ghous.shah91@gmail.com";
let password = "Pa$$w0rd"

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
  createUserInAmazonCognito() {
    console.log("create user")
    //Fill required atributes
    const attributeList = [];
    const attributeGivenName = new CognitoUserAttribute({ Name: "given_name", Value: "Ghous" });
    attributeList.push(attributeGivenName);
    var cognitoUser;
    //Call SignUp function
    this.userPool.signUp(username, password,
      attributeList, null, (err, result) => {
        if (err) {
          console.log("Error at signup ", err);
          return;
        }
        let cognitoUser = result.user;
        console.log("cognitoUser", cognitoUser)
      });
  }

  signIn() {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });
    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: this.userPool
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log('onSuccess', result)
        console.log('access token + ' + result.getAccessToken().getJwtToken());
      },
      onFailure: (err) => {
        console.log('onFailure', err)
      },
      mfaRequired: (codeDeliveryDetails) => {
        console.log('mfaRequired', codeDeliveryDetails)
      }
    });
  }
  componentDidMount() {
    console.log("component did mount")
    //1) Create User Pool
    this.userPool = new CognitoUserPool({
      UserPoolId: "us-east-1_RMzO8obfn",
      ClientId: "1c8jdgvmlpp6grh3uab5stvp3k"
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
        <Button onPress={this.fblogin.bind(this)} title="Facebook login" />
        <Button onPress={this.createUserInAmazonCognito.bind(this)} title="Amazon Signup" />
        <Button onPress={this.signIn.bind(this)} title="Amazon login" />
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
