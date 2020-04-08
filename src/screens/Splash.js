import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import ImageIcon from '../components/primary/ImageIcon';

export function Splash() {
  const styles = {
    containerStyles: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    spinnerStyle: {
      marginVertical: 16,
    },
  };

  return (
    <View style={styles.containerStyles}>
      <ImageIcon name="logo" />

      <ActivityIndicator style={styles.spinnerStyle} animating color="#91CC42" />
    </View>
  );
}

export default Splash;
