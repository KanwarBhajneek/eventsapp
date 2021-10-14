import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-ionicons';

export default class TopBar extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onBackPress}>
          <Icon size={40} color="white" name="arrow-round-back" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
