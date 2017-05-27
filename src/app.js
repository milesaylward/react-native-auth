import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, CardItem, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: null
    };
  }

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'YOUR_AUTH_KEY',
    authDomain: 'YOUR_AUTH_INFO',
    databaseURL: 'YOUR_AUTH_INFO',
    projectId: 'YOUR_AUTH_INFO',
    storageBucket: 'YOUR_AUTH_INFO',
    messagingSenderId: 'YOUR_AUTH_INFO'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardItem>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardItem>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.loadingContainerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  loadingContainerStyle: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;
