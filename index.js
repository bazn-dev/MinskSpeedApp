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
import PushNotification from 'react-native-push-notification';
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
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('LOCAL NOTIFICATION ==>', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    setTimeout(() => {
      this.setState({
        displayLoading: false,
      });
    }, 2000);
  }

  render() {
    const {displayLoading} = this.state;
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
            <Text
              style={{
                position: 'absolute',
                bottom: 10,
                fontSize: 12,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 13,
                opacity: 0.5,
                textAlign: 'center',
              }}>
              Данная информация приводится справочно, и не должна провоцировать
              на нарушение водителя скоростного режима! Мы призываем внимательно
              относиться к ПДД!
            </Text>
            <Text
              style={{
                position: 'absolute',
                bottom: 6,
                fontSize: 12,
                fontWeight: 'bold',
                marginLeft: 15,
                marginRight: 15,
                opacity: 0.5,
                textAlign: 'center',
              }}>
              Будьте внимательны на дороге!
            </Text>
          </View>
        )}
        {!displayLoading && <App displaySettings={this.displaySettings} />}
        {/*{isShowSettings && <Settings displaySettings={this.displaySettings} />}*/}
      </View>
    );
  }
}

ReactNativeForegroundService.register();
AppRegistry.registerComponent(appName, () => SwitchView);
