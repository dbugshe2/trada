import React, { useState } from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import ImageIcon from '../../components/primary/ImageIcon';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';

import { SIZES } from '../../utils/theme';
import { Divider } from 'react-native-paper';

const Settings = ({ navigation }) => {
  return (
    <Block background>
      <Header backTitle="Settings" />
      <Block paddingHorizontal={SIZES.padding}>
        <Button
          height={48}
          transparent
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Block row center>
            <ImageIcon name="lock" />
            <Text marginLeft={10} gray h6>
              Change Password
            </Text>
          </Block>
          <Divider />
        </Button>
      </Block>
    </Block>
  );
};

export default Settings;
