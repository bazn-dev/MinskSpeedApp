/**
 * @format
 */

//import 'react-native-gesture-handler';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {
  AppRegistry,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import App from './App';
import Settings from './Settings';
import {name as appName} from './app.json';
import React from 'react';
//import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';

//const Stack = createStackNavigator();

class SwitchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSettings: false,
      displayLoading: true,
    };
  }

  displaySettings = () => {
    this.setState({
      isShowSettings: !this.state.isShowSettings,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        displayLoading: false,
      });
    }, 2000);
  }

  render() {
    const {isShowSettings, displayLoading} = this.state;
    console.log('________________', isShowSettings);

    return (
      <View>
        <StatusBar barStyle="light-content" />
        {displayLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
              backgroundColor: '#ffe70a',
            }}>
            <Image
              source={require('./logo-loading.png')}
              style={{width: Dimensions.get('window').width - 100}}
              resizeMode="contain"
            />
          </View>
        )}
        {!displayLoading && <App displaySettings={this.displaySettings} />}
        {isShowSettings && <Settings displaySettings={this.displaySettings} />}
      </View>
    );
  }
}

ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => SwitchView);
