import React from 'react';
import {
  Dimensions, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: Colors.lighter,
        zIndex: 999,
      },
    };
  }

  closeSettings() {
    this.props.displaySettings();
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          zIndex: 999,
          backgroundColor: '#000000',
          padding: 15,
        }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#ffffff',
          }}>
          НАСТРОЙКИ
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 50,
            left: Dimensions.get('window').width / 2 - 25,
            backgroundColor: '#DDDDDD',
            borderRadius: 100,
            width: 50,
            height: 50,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.closeSettings.bind(this)}>
          <Image
            source={require('./icons8-multiply-96.png')}
            style={{
              width: 18,
              height: 18,
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Settings;
