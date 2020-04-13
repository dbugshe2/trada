/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';

import { SIZES } from '../../utils/theme';
import { Image } from 'react-native';

const FarmerPhoto = ({ navigation }) => {
  return (
    <Block background>
      <Header backTitle />

      <Block flex={1} marginVertical={10} paddingHorizontal={SIZES.padding}>
        <Text mtmedium gray h5 marginVertical={5}>
          Make sure farmers photo is not blurry.
        </Text>
        <Block scroll>
          <Block center marginTop={80} flex={0}>
            <Image
              source={{
                uri: 'https://api.adorable.io/avatars/100/tradaAvatar.png',
              }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
            <Block center marginVertical={35} flex={0}>
              <Text h6 gray>
                Is this clear enough?
              </Text>
              <Text paddingHorizontal={80} marginTop={10} small center muted>
                Make sure your face is clear enough and the photo is not blurry
              </Text>
            </Block>
          </Block>

          <Block marginVertical={20} flex={0}>
            <Button onPress={() => navigation.navigate('FarmerSummary')}>
              <Text white center h6>
                Yes use this one
              </Text>
            </Button>
          </Block>
          <Block flex={0}>
            <Button secondary>
              <Text white center h6>
                Retake photo
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default FarmerPhoto;
