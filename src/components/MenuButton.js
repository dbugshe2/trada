import React from 'react'
import Button from './primary/Button';
import ImageIcon from './primary/ImageIcon';
import { SIZES } from '../utils/theme';
import { useNavigation } from '@react-navigation/native';
import Block from './primary/Block';

const MenuButton = props => {
  const {style} = props
  const navigation = useNavigation()
  return (
    <Block middle flex={0} width={68} style={style}>
    <Button transparent paddingHorizontal={SIZES.padding} onPress={() => navigation.openDrawer()}>
      <ImageIcon name="menu" />
    </Button>
    </Block>
  )
}

export default MenuButton
