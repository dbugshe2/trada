import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Text from "./primary/Text";
import Block from "./primary/Block";
import BackButton from "./BackButton";
import { SIZES } from "../utils/theme";
import ImageIcon from "./primary/ImageIcon";
import MenuButton from "./MenuButton";

const Header = props => {
  const {
    renderLeft,
    title,
    backTitle,
    main,
    shadow,
    renderRight,
    onPressLeft,
    onPressRight
  } = props;
  const navigation = useNavigation();
  const HEADER_HEIGHT = 56;
  const styles = StyleSheet.flatten([
    shadow && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
      borderWidth: 1,
      borderColor: "#fff"
    }
  ]);
  return (
    <Block
      flex={0}
      height={HEADER_HEIGHT}
      row
      space="between"
      middle
      background
      style={styles}
    >
      {renderLeft ? (
        renderLeft()
      ) : title ? (
        <Block middle paddingLeft={SIZES.padding}>
          <Text h2 black mtregular>
            {title}
          </Text>
        </Block>
      ) : (
        backTitle && (
          <Block>
            <BackButton backTitle={backTitle && backTitle} />
          </Block>
        )
      )}
      {main && (
        <Block space="between" row>
          <Block center middle>
            <ImageIcon name="trada" />
          </Block>
          <MenuButton
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: HEADER_HEIGHT,
              zIndex: 99999999999
            }}
          />
        </Block>
      )}
      {renderRight ? renderRight() : null}
    </Block>
  );
};

export default Header;
