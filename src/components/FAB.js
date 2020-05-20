import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './primary/Button';
import ImageIcon from './primary/ImageIcon';

const FAB = (props) => {
  const { onPress, top, bottom, left, right, name } = props;
  const fabStyle = StyleSheet.flatten([
    {
      position: 'absolute',
    },
    top && { top: top },
    bottom && { bottom: bottom },
    left && { left: left },
    right && { right: right },
  ]);
  if (name) {
    return (
      <Button
        right
        style={fabStyle}
        center
        middle
        odd
        {...props}
        onPress={onPress}
      >
        <ImageIcon style={{}} name={name} />
      </Button>
    );
  }
  return (
    <Button
      right
      style={fabStyle}
      center
      middle
      odd
      {...props}
      onPress={onPress}
    >
      <ImageIcon style={{}} name="plus" />
    </Button>
  );
};

export default FAB;

const style = StyleSheet.create({});
