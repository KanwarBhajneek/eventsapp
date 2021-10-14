import moment from 'moment';
import React, {PureComponent} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from 'react-native';
import TopBar from '../components/TopBar';
import Icon from 'react-native-ionicons';
import {getEventDetail} from '../api/EventsApi';

export default class EventDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      league: '',
      loading: true,
    };
  }
  onBackPress = () => {
    this.props.navigation.goBack();
  };

  getStartDate = time => {
    if (!time) {
      return '';
    }
    return moment(time).format('MMMM Do YYYY');
  };

  getStartTime = time => {
    if (!time) {
      return '';
    }
    return moment(time).format('h:mm a Z') + ' GMT';
  };
  componentDidMount() {
    var event = this.props.route.params.event;
    if (event?.parent_id) {
      getEventDetail(event.parent_id)
        .then(response => {
          this.setState({league: response?.events?.[0].name, loading: false});
        })
        .catch(() => {
          this.setState({league: 'Something went wrong!', loading: false});
        });
    }
  }

  render() {
    var event = this.props.route.params.event;
    return (
      <View style={styles.container}>
        <TopBar onBackPress={this.onBackPress.bind(this)} />
        <Text style={styles.headline}>{event?.name}</Text>
        <View style={styles.iconContainer}>
          <Icon color="gray" name="calendar" style={styles.icon} />
          <Text style={styles.detail}>
            {this.getStartDate(event?.start_datetime)}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon color="gray" name="time" style={styles.icon} />
          <Text style={styles.detail}>
            {this.getStartTime(event?.start_datetime)}
          </Text>
        </View>
        <View style={styles.divider}></View>
        <Text style={styles.subText}>
          Betting:{event?.bet_allowed ? ' Allowed' : ' Not allowed'}
        </Text>
        <Text style={styles.subText}>
          In play enabled:{event?.inplay_enabled ? ' Yes' : ' No'}
        </Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <View style={styles.league}>
            <Text style={styles.detail}>{'League:  ' + this.state.league}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  headline: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detail: {
    color: 'gray',
    fontSize: 25,
    fontWeight: 'bold',
  },
  subText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 15,
  },
  league: {
    marginVertical: 10,
  },
});
