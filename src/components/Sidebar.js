import React, { useContext } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerView
} from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import Block from "./primary/Block";
import Text from "./primary/Text";
import Button from "./primary/Button";
import { Image } from "react-native";
import { useAuthContext } from "../context/auth/AuthContext";
import { SIZES } from "../utils/theme";
import ImageIcon from './primary/ImageIcon';

const Sidebar = props => {
  const auth = useAuthContext();
  const { logout, userDetails } = auth;
  const navigation = useNavigation();
  return (
    <Block scroll showVerticalScrollIndicator={false} space="between">
      <Block>
        <Block height={166} center marginVertical={SIZES.padding * 2} space="evenly">
          <Image
            source={{
              uri: userDetails.profileImage
            }}
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <Text h5 gray mtmedium>{userDetails.firstName} {userDetails.lastName}</Text>
          <Button secondary height={18} paddingHorizontal={SIZES.base} paddingHorizontal={SIZES.padding}
          onPress={() => navigation.navigate("ProfileTab")}
          >
            <Text small white center mtmedium>
              Edit Profile
            </Text>
          </Button>
        </Block>
        <Block flex={2}>
          <DrawerItemList {...props} />
        </Block>
      </Block>
      <DrawerItem {...props} icon={({ focused, color, size }) => <ImageIcon name="logout" /> } onPress={() => logout()} label="Logout" />
    </Block>
  );
};

export default Sidebar;
