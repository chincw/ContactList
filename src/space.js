import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const propTypes = {
  value: PropTypes.number,
  isVertical: PropTypes.bool,
};

const defaultProps = {
  value: 2,
  isVertical: true,
};

export default function Space({value, isVertical}) {
  return (
    <View
      style={
        isVertical
          ? {paddingVertical: value * 4}
          : {paddingHorizontal: value * 4}
      }
    />
  );
}

Space.propTypes = propTypes;
Space.defaultProps = defaultProps;
