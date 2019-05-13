import React from 'react';
import { Platform, StatusBar, StyleSheet, View ,Text, TouchableHighlight, Image, Alert, Vibration, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon,Constants, BarCodeScanner, Permissions, Contacts } from 'expo';
import AppNavigator from './navigation/AppNavigator';
class HeaderNavigationBar extends React.Component {
  render() {
      return (<View style={{
          height: 70,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center'
      }}>
          <TouchableHighlight style={{ marginLeft: 10, marginTop: 15 }}
              onPress={() => { this.props.navigation.openDrawer() }}>
              <Image
                  style={{ width: 32, height: 32 }}
                  source={{uri: 'https://png.icons8.com/ios/2x/menu-filled.png'}}
              />
          </TouchableHighlight>
      </View>);
  }
}
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
        
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});
