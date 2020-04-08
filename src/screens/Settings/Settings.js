import React, {useState} from 'react'
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";

import Block from '../../components/primary/Block'
import Text from '../../components/primary/Text'
import ImageIcon from '../../components/primary/ImageIcon'
import Button from '../../components/primary/Button'
import Header from '../../components/Header'


import { SIZES } from '../../utils/theme'
import { Divider } from 'react-native-paper';



const Settings = ({navigation}) => {
  return (
   <Block background>
    <Header backTitle="Settings" />
   <Block paddingHorizontal={SIZES.padding} scroll background>

    <Block marginVertical={18} center >

        <ImageIcon name="lock" />

        <Button transparent   onPress={() => navigation.navigate("ChangePassword")}>
        <Text marginLeft={10} gray h6>Change Password</Text>
        </Button>

    </Block>
    <Divider />
  
  </Block>
  </Block>
  )
}

export default Settings
