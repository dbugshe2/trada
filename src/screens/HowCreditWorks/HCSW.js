/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import howCreditScores from '../../assets/icons/howCreditScores.png';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';

class HCSW extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  render() {
    return (
      <Block background>
        <Header backTitle="How Credit Score Works" />

        <Block center middle>
          <ImageBackground
            source={howCreditScores}
            style={{ width: '100%', height: '100%' }}
          />
        </Block>
      </Block>
    );
  }
}

export default HCSW;
export const { width, height } = SIZES;
