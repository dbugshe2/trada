import React from 'react';
import { Image, StyleSheet, ImageBackground } from 'react-native';
import icons from '../../constants/icons';

const ImageIcon = (props) => {
  const {
    name,
    style,
    absolute,
    top,
    right,
    bottom,
    left,
    children,
    background,
    resize,
  } = props;
  const { icon, height, width } = icons[`${name}`];
  const iconStyles = StyleSheet.flatten(
    {
      height: height,
      width: width,
    },
    absolute && { position: 'absolute' },
    top && { top },
    right && { right },
    bottom && { bottom },
    left && { left },
    style && { ...style }
  );
  if (background) {
    return (
      <ImageBackground
        source={icon}
        style={iconStyles}
        resizeMode={(resize && resize) || 'contain'}
        {...props}
      >
        {children}
      </ImageBackground>
    );
  }
  return (
    <Image
      source={icon}
      style={iconStyles}
      resizeMode={(resize && resize) || 'contain'}
      {...props}
    />
  );
};

ImageIcon.defaultProps = {
  name: 'add',
};

export default ImageIcon;
