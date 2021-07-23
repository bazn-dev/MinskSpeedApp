import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Switch,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import MapView, {Marker} from 'react-native-maps';
import {getDistance} from 'geolib';
import Markers from './Markers';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapStyleDark: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#212121',
            },
          ],
        },
        {
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#212121',
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          featureType: 'administrative.country',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#bdbdbd',
            },
          ],
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#181818',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#1b1b1b',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#2c2c2c',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#8a8a8a',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#373737',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#3c3c3c',
            },
          ],
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [
            {
              color: '#4e4e4e',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#000000',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#3d3d3d',
            },
          ],
        },
      ],
      mapStyleLight: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
          ],
        },
        {
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f5f5f5',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#bdbdbd',
            },
          ],
        },
        {
          featureType: 'administrative.neighborhood',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dadada',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161',
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e',
            },
          ],
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5',
            },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c9c9c9',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e',
            },
          ],
        },
      ],
      location: null,
      speed: 0,
      backgroundStyle: {
        backgroundColor: Colors.darker,
      },
      region: {
        latitude: 53.902699,
        longitude: 27.556933,
        latitudeDelta: 0.4,
        longitudeDelta:
          (0.4 * Dimensions.get('window').width) /
          Dimensions.get('window').height,
      },
      radars: [],
      lastDistanceToRadar: null,
      nearestRadar: null,
      isRunningGeo: 0,
      isNotified: false,
      isTracker: false,
      theme: true,
      error: '',
    };
  }

  async getNearestRadar(curLocation) {
    const nearestRadars = this.state.radars.filter(
      radar => getDistance(curLocation, radar.coordinate) < 1000,
    );

    if (nearestRadars.length > 0) {
      if (!this.state.isNotified) {
        const distanceToRadar = getDistance(
          curLocation,
          nearestRadars[0].coordinate,
        );

        if (
          distanceToRadar < this.state.lastDistanceToRadar ||
          this.state.lastDistanceToRadar === null
        ) {
          ReactNativeForegroundService.update({
            id: 144,
            title: 'Speeding',
            message: `Радар через ${distanceToRadar} м`,
          });
        }

        this.setState({
          isNotified: true,
          lastDistanceToRadar: distanceToRadar,
        });
      }
      return nearestRadars[0];
    }
    this.setState({
      isNotified: false,
      lastDistanceToRadar: null,
      nearestRadar: null,
    });

    return null;
  }

  switchTheme(value) {
    this.setState({
      theme: !this.state.theme,
    });
  }

  async componentDidMount() {
    if (ReactNativeForegroundService.is_task_running(144)) {
      return;
    }

    const backgroundgranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
      {
        title: 'Background Location Permission',
        message:
          'We need access to your location ' +
          'so you can get live quality updates.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    RNLocation.configure({
      distanceFilter: 1, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'highAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 1000, // Milliseconds
      fastestInterval: 500, // Milliseconds
      maxWaitTime: 0, // Milliseconds
    });
    let locationSubscription = null;
    let locationTimeout = null;

    ReactNativeForegroundService.add_task(
      () => {
        RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'fine',
          },
        }).then(granted => {
          if (granted) {
            locationSubscription && locationSubscription();
            locationSubscription = RNLocation.subscribeToLocationUpdates(
              async ([locations]) => {
                locationSubscription();
                locationTimeout && clearTimeout(locationTimeout);
                const counter = this.state.isRunningGeo + 1;
                this.setState({
                  isRunningGeo: counter,
                  location: {
                    latitude: locations.latitude,
                    longitude: locations.longitude,
                    heading: locations.course,
                  },
                  speed: Math.round(locations.speed * 3.6 * 10) / 10,
                  nearestRadar: await this.getNearestRadar({
                    latitude: locations.latitude,
                    longitude: locations.longitude,
                  }),
                });

                if (this.state.isTracker) {
                  this.setState({
                    region: {
                      latitude: locations.latitude,
                      longitude: locations.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta:
                        (0.005 * Dimensions.get('window').width) /
                        Dimensions.get('window').height,
                    },
                  });
                }
              },
            );
          } else {
            locationSubscription && locationSubscription();
            locationTimeout && clearTimeout(locationTimeout);
            console.log('no permissions to obtain location');
          }
        });
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 144,
        onError: e => console.log('Error logging:', e),
      },
    );

    ReactNativeForegroundService.start({
      id: 144,
      title: 'Speeding',
      message: 'Отслеживает радары!',
    });

    BackHandler.addEventListener('hardwareBackPress', () => true);
  }

  onPressTrackingCursor() {
    this.setState({
      isTracker: !this.state.isTracker,
    });
  }

  onPanDrag() {
    this.setState({
      isTracker: false,
    });
  }

  displaySettings() {
    this.props.displaySettings();
  }

  async exit() {
    if (ReactNativeForegroundService.is_task_running(144)) {
      ReactNativeForegroundService.remove_task(144);
    }

    BackHandler.removeEventListener('hardwareBackPress', () => true);
    BackHandler.exitApp();

    return ReactNativeForegroundService.stop();
  }

  handleChangeRadars(radars) {
    radars.push({
      coordinate: {
        latitude: 53.9085551,
        longitude: 27.6339528,
      },
      info: {
        title:
          'МКАД, 0 км., 1 шт. - PoliScan M1HP, внешнее кольцо, легковые 90 / грузовые 90',
        description:
          'МКАД, 0 км., 1 шт. - PoliScan M1HP, внешнее кольцо, легковые 90 / грузовые 90',
      },
    });
    this.setState({
      radars,
    });
  }

  render() {
    const {
      region,
      location,
      speed,
      nearestRadar,
      isRunningGeo,
      theme,
      mapStyleLight,
      mapStyleDark,
      isTracker,
      lastDistanceToRadar,
    } = this.state;
    let colorTrackerBtn = '#000000';

    if (theme) {
      colorTrackerBtn = isTracker ? '#000000' : '#6f6f6f';
    } else {
      colorTrackerBtn = isTracker ? '#ffe70a' : '#766a00';
    }

    return (
      <View style={this.state.backgroundStyle}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={this.state.backgroundStyle}>
          <View
            style={{
              backgroundColor: Colors.black,
            }}>
            <Text
              style={{
                position: 'absolute',
                bottom: 30,
                left: 10,
                fontSize: 48,
                fontWeight: 'bold',
                zIndex: 100,
                color: theme ? '#000000' : '#ffffff',
              }}>
              {speed}{' '}
              <Text style={{fontSize: 24, fontWeight: 'normal'}}>км/ч</Text>
            </Text>
            {nearestRadar && (
              <Text
                style={{
                  position: 'absolute',
                  top: 80,
                  left:
                    Dimensions.get('window').width / 2 -
                    (Dimensions.get('window').width - 100) / 2,
                  width: Dimensions.get('window').width - 100,
                  backgroundColor: '#ffe70a',
                  zIndex: 100,
                  padding: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  color: '#000000',
                  borderRadius: 25,
                }}>
                {nearestRadar.info.title} -{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {lastDistanceToRadar && lastDistanceToRadar} м
                </Text>
              </Text>
            )}
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 50,
                right: 20,
                backgroundColor: colorTrackerBtn,
                borderRadius: 100,
                zIndex: 100,
                padding: 18,
              }}
              onPress={this.onPressTrackingCursor.bind(this)}>
              <Image
                source={
                  theme
                    ? require('./compass-white.png')
                    : require('./compass.png')
                }
                style={{
                  width: 22,
                  height: 22,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 25,
                left: 25,
                backgroundColor: 'transparent',
                borderRadius: 100,
                zIndex: 100,
              }}
              onPress={this.exit.bind(this)}>
              <Image
                source={
                  theme
                    ? require('./icons8-exit-96.png')
                    : require('./icons8-exit-96-white.png')
                }
                style={{
                  width: 28,
                  height: 28,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 25,
                right: 25,
                backgroundColor: 'transparent',
                borderRadius: 100,
                zIndex: 100,
              }}
              onPress={this.switchTheme.bind(this)}>
              <Image
                source={
                  theme
                    ? require('./icons8-crescent-moon-96.png')
                    : require('./icons8-sun-100.png')
                }
                style={{
                  width: 28,
                  height: 28,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <MapView
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height + 30,
              }}
              initialRegion={region}
              region={isTracker ? region : null}
              customMapStyle={theme ? mapStyleLight : mapStyleDark}
              showsCompass={false}
              /*camera={{heading: location ? location.heading : 0, pitch: 0, altitude: 0, zoom: 0}}*/
              onPanDrag={this.onPanDrag.bind(this)}>
              <Markers
                onChangeRadars={this.handleChangeRadars.bind(this)}
                theme={theme}
              />

              {location && (
                <Marker.Animated
                  coordinate={location}
                  flat
                  style={{
                    transform: [
                      {
                        rotate:
                          location.heading === undefined
                            ? '0deg'
                            : `${location.heading}deg`,
                      },
                    ],
                  }}>
                  <Image
                    source={require('./arrow.png')}
                    style={{
                      width: 26,
                      height: 28,
                    }}
                    resizeMode="contain"
                  />
                </Marker.Animated>
              )}
            </MapView>
          </View>
        </ScrollView>
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

export default App;
