import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardItem, Input, Spinner } from './common';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };
  }

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({
      error: '',
      loading: true
    });

    /*
    attempt to login user
    if account does not exist attempt to create one
    if sucessful on either count call login sucess
    if both unsucessful display error message
    */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSucess.bind(this))
      .catch(() => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSucess.bind(this))
            .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  onLoginSucess() {
      this.setState({
        loading: false,
        email: '',
        password: ''
      });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size='small' />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Sign-up/Log-in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardItem>
          <Input
            label='Email'
            placeholder='user@gmail.com'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardItem>
        <CardItem>
          <Input
            secureTextEntry
            label='Password'
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardItem>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardItem>
          {this.renderButton()}
        </CardItem>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
