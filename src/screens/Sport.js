import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView, Text, FlatList, View} from 'react-native';
import {getPopularEvents} from '../api/EventsApi';
import EventCard from '../components/EventCard';
import DropDownPicker from 'react-native-dropdown-picker';

export default class Sport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      open: false,
      value: 'football',
      items: [
        {label: 'Football', value: 'football'},
        {label: 'Tennis', value: 'tennis'},
        {label: 'Baseball', value: 'baseball'},
        {label: 'Basketball', value: 'basketball'},
      ],
    };
  }

  componentDidMount() {
    this.refreshSport(this.state.value);
  }

  refreshSport(sport) {
    this.setState({events: []});
    getPopularEvents(sport)
      .then(response => {
        this.setState({
          events: [...response['popular_event_ids']],
          value: sport,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onEventPress = event => {
    this.props.navigation.navigate('EventDetail', {event: event});
  };

  renderItem = ({item}) => {
    return <EventCard eventId={item} onEventPress={this.onEventPress} />;
  };

  setValue = callback => {
    let sport = callback();
    this.setState({value: sport});
    this.refreshSport(sport);
  };

  setOpen = open => {
    this.setState({open: open});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              containerStyle={styles.dropdown}
              style={styles.dropdownStyle}
              labelStyle={styles.labelStyle}
              textStyle={styles.textStyle}
              open={this.state.open}
              value={this.state.value}
              items={this.state.items}
              setOpen={this.setOpen}
              setValue={this.setValue}
            />
            <Text style={styles.headline}>Popular Events</Text>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.events}
            renderItem={this.renderItem.bind(this)}
            extraData={this.state.value}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  subContainer: {flex: 1, backgroundColor: 'black'},
  list: {backgroundColor: 'black'},
  dropdown: {
    margin: 20,
    width: 150,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownStyle: {
    backgroundColor: '#333333',
  },
  headline: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  labelStyle: {
    color: 'white',
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
