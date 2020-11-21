import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const propTypes = {
  title: PropTypes.any,
  iconLeft: PropTypes.any,
  iconRight: PropTypes.any,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  textLeft: PropTypes.any,
  textRight: PropTypes.any,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
};

const defaultProps = {
  title: '',
  iconLeft: null,
  iconRight: null,
  onPressLeft: () => {},
  onPressRight: () => {},
};

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      title,
      iconLeft = false,
      iconRight = false,
      iconColor,
      iconSize,
      textLeft = false,
      textRight = false,
      onPressLeft,
      onPressRight,
      children,
    } = this.props;

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.headerContainer}>
          {iconLeft && (
            <TouchableOpacity onPress={onPressLeft}>
              <Icon name={iconLeft} color={iconColor} size={iconSize} />
            </TouchableOpacity>
          )}
          {textLeft && (
            <TouchableOpacity onPress={onPressLeft}>
              <Text style={{fontSize: 26, color: '#ff8c00'}}>{textLeft}</Text>
            </TouchableOpacity>
          )}
          <Text style={{fontWeight: 'bold', fontSize: 26}}>{title}</Text>
          {iconRight && (
            <TouchableOpacity onPress={onPressRight}>
              <Icon name={iconRight} color={iconColor} size={iconSize} />
            </TouchableOpacity>
          )}
          {textRight && (
            <TouchableOpacity onPress={onPressRight}>
              <Text style={{fontSize: 26, color: '#ff8c00'}}>{textRight}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{backgroundColor: '#FFFFFF'}}>{children}</View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 50,
  },
});

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
