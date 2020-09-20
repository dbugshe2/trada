import React from 'react';
import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Block from './primary/Block';
import Text from './primary/Text';
import Button from './primary/Button';
import { Image } from 'react-native';
import { useAuthContext } from '../context/auth/AuthContext';
import { SIZES } from '../utils/theme';
import ImageIcon from './primary/ImageIcon';

const Sidebar = (props) => {
  const { logout, userDetails } = useAuthContext();

  const navigation = useNavigation();
  async function logMeOut() {
    await logout();
  }
  return (
    <Block space="between">
      <Block scroll showVerticalScrollIndicator={false}>
        <Block
          height={166}
          center
          marginVertical={SIZES.padding}
          space="evenly"
        >
          {userDetails !== null && typeof userDetails !== undefined ? (
            <>
              <Image
                source={{
                  uri: userDetails.profileImage,
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
              <Text h5 gray mtmedium>
                {userDetails.firstName} {userDetails.lastName}
              </Text>
              <Button
                secondary
                height={18}
                paddingHorizontal={SIZES.padding}
                onPress={() => navigation.navigate('Profile')}
              >
                <Text small white center mtmedium>
                  Edit Profile
                </Text>
              </Button>
            </>
          ) : (
            <Text error center>
              Unable to load profile info
            </Text>
          )}
        </Block>

        <Block flex={2} paddingBottom={SIZES.base}>
          <DrawerItemList {...props} />
        </Block>
      </Block>
      <DrawerItem
        {...props}
        icon={({ focused, color, size }) => <ImageIcon name="logout" />}
        onPress={logMeOut}
        label="Logout"
      />
    </Block>
  );
};

export default Sidebar;
