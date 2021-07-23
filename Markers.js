import React from 'react';
import {Marker} from 'react-native-maps';
import {Image, View, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radars: [],
    };
  }

  async UNSAFE_componentWillMount() {
    const response = await fetch(
      'https://raw.githubusercontent.com/bazn-dev/MinskSpeed/main/radars.json',
    );
    const json = await response.json();

    this.setState({
      radars: json,
    });
    this.props.onChangeRadars(json);
  }

  mapMarkers() {
    return (
      this.state.radars.length > 0 &&
      this.state.radars.map((radar, index) => (
        <Marker
          key={index}
          pinColor={'darkorange'}
          coordinate={radar.coordinate}
          title={radar.info.title}
          description={radar.info.description}
        />
      ))
    );
  }

  render() {
    return this.mapMarkers();
  }
}

export default Markers;
