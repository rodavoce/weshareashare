import { StyleSheet, View, Image, TouchableHighlight, Text } from 'react-native';
import { Button } from 'react-native-elements';
import Header from './Header.js';
import Logo from '../Homepage/Logo.js';
import ThreeButtons from './ThreeButtons.js';

var React = require('react');

var Homepage = React.createClass({

  getInitialState () {
    return {
      title: "Stoik PPR"
    };
  },

  onPressLoginBtn() {
    
  },

  onPressWhatIsPPR() {
    console.log(2);
  },

  onPressStoikBenefits() {
    console.log(3);    
  },

  render() {
    const { navigate } = this.props.navigation;    
    return (
      <View style={stylesHomepage.container}>
        <Header />

        <View>
          <Logo />
          <ThreeButtons /> 
        </View>
        
        <View>
          <Button
            title='Log in' 
            onPress={() => navigate('Login')} 
            backgroundColor='#475B64'
            borderRadius={8}
            containerViewStyle={{marginVertical: 10, borderRadius: 8}}/>
          <Button
            title='What is a PPR?'
            onPress={this.onPressWhatIsPPR}
            backgroundColor='#475B64'
            borderRadius={8}
            containerViewStyle={{marginVertical: 10, borderRadius: 8}} />
          <Button
            title='Stoik PPR Benefits'
            onPress={this.onPressStoikBenefits}
            backgroundColor='#475B64'
            borderRadius={8}
            containerViewStyle={{marginVertical: 10, borderRadius: 8}} /> 
        </View> 
      </View>
    );
  }

});

var stylesHomepage = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    width: 160,
    backgroundColor: '#475B64',
    borderColor: '#475B64',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
  }
});

export default Homepage;