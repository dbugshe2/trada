import React from 'react';
import { SIZES } from '../../utils/theme';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Swiper from '../../components/Swiper';

const UserOnboarding = ({ navigation }) => {
  return (
    <Block background>
      <Block flex={2}>
        <Swiper showPagination autoplay>
          <Block width={SIZES.width}>
            <ImageIcon background name="holdingGrain" resizeMode="cover">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
          <Block width={SIZES.width}>
            <ImageIcon background name="slide01">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
          <Block width={SIZES.width}>
            <ImageIcon background name="slide02">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
          <Block width={SIZES.width}>
            <ImageIcon background name="slide03">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
          <Block width={SIZES.width}>
            <ImageIcon background name="slide04">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
          <Block width={SIZES.width}>
            <ImageIcon background name="slide05">
              <ImageIcon name="logoAlt" absolute={true} top={20} left={20} />
            </ImageIcon>
            <Block paddingTop={40} flex={1}>
              <Text h3 center mtmedium>
                Access to quality inputs
              </Text>
              <Text gray mtlight center marginVertical={SIZES.padding}>
                We provide quality inputs from different manufacturers at the
                best prices.
              </Text>
            </Block>
          </Block>
        </Swiper>
      </Block>
      <Block space="evenly" center row flex={0.4}>
        <Block>
          <Button
            height={'100%'}
            transparent
            onPress={() => navigation.navigate('Login')}
          >
            <Text h5 muted mtregular center>
              Login
            </Text>
          </Button>
        </Block>
        <Block flex={0} width={1} height={35} inactive />
        <Block>
          <Button
            height={'100%'}
            transparent
            onPress={() => navigation.navigate('MobileVerification')}
          >
            <Text mtregular primary h5 center>
              Register
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default UserOnboarding;
