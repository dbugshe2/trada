import React from 'react';
import { SIZES } from '../../utils/theme';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const UserOnboarding = ({ navigation }) => {
  return (
    <Block background>
      <Block flex={2}>
        <ImageIcon background name="holdingGrain">
          <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
        </ImageIcon>
        <Block paddingTop={40} flex={1}>
          <Text h3 center mtbold>
            Access to quality inputs
          </Text>
          <Text
            gray
            mtlight
            center
            marginVertical={SIZES.padding}
            paddingHorizontal={SIZES.padding}
          >
            We provide quality inputs from different manufacturers at the best
            prices.
          </Text>
        </Block>
      </Block>
      <Block space="evenly" center row flex={0.5}>
        <Button transparent onPress={() => navigation.navigate('Login')}>
          <Text h5 muted mtregular>
            Login
          </Text>
        </Button>
        <Block flex={0} width={1} height={35} inactive />
        <Button
          transparent
          onPress={() => navigation.navigate('MobileVerification')}
        >
          <Text mtregular primary h5>
            Register
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default UserOnboarding;
