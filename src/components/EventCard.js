import moment from 'moment';
import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {getEventDetail} from '../api/EventsApi';
import Icon from 'react-native-ionicons';
import {TouchableOpacity} from 'react-native';

export default class EventCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: {},
    };
  }

  componentDidMount() {
    var eventId = this.props.eventId;
    getEventDetail(eventId)
      .then(response => {
        this.setState({data: response?.events?.[0], loading: false});
      })
      .catch(() => {});
  }

  getFromNow(time) {
    if (!time) {
      return '';
    }
    return moment(time).fromNow();
  }
  getIconName(type) {
    switch (type) {
      case 'football_match':
        return 'football';
      case 'tennis_match':
        return 'tennisball';
      case 'baseball_match':
        return 'baseball';
      case 'basketball_match':
        return 'basketball';
      default:
        return 'grid';
    }
  }
  getEventState(state) {
    if (!state || state.length === 0) {
      return '';
    }
    return state[0].toUpperCase() + state.slice(1);
  }

  render() {
    var event = this.state.data;
    return (
      <View style={styles.itemContainer}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <TouchableOpacity
            style={styles.click}
            onPress={this.props.onEventPress.bind(this, event)}>
            <View style={styles.loadedView}>
              <Icon color="yellow" name={this.getIconName(event?.type)} />
              <View style={styles.textContainer}>
                <Text style={styles.headline}>{event?.name}</Text>
                <Text style={styles.subText}>
                  {this.getEventState(event?.state) +
                    ' ' +
                    this.getFromNow(event?.start_datetime)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333333',
    marginHorizontal: 20,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    justifyContent: 'center',
  },
  loadedView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: 20,
  },
  click: {
    flex: 1,
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  subText: {
    color: 'white',
  },
});
