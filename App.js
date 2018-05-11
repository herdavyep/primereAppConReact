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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export class Loading extends Component{
  render(){
    return(
      <Text>Loading..... </Text>
    )
  }  
}

export class ComponenteHijo extends Component{
  render(){
    if(this.props.result){
      var res = this.props.result.map((item, i) => {
        return (
          <Text key={i}>{item.title}</Text>
        )
      })
    }else{
      return(
        <Loading/>
      )
    }

    return(
      <View>
        {res}
        <View style={this.props.status ? styles.on : styles.off} />
      </View>  
    )
  }
}

export default class App extends Component<Props> {
  constructor(){
    super()

    this.state = {
      status: false,
      data: null
    }
  }

  componentDidMount(){
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.movies
        })
      })
  }

  alPrecionar(){
    this.setState({
      status: !this.state.status
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <ComponenteHijo status={this.state.status} result={this.state.data} />
        <Button 
          onPress={this.alPrecionar.bind(this)}
          title='Presioname!!'
          color='red'
        />
        <Text style={styles.welcome}>
          Bienvenido a react nativo
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  on:{ 
    width: 100,
    height: 100,
    backgroundColor: 'yellow'
  },
  off: {
    width: 100,
    height: 100,
    backgroundColor: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#64d6b9',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#a264d6',
    marginBottom: 5,
  },
});
