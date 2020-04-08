import React from "react";
import { Snackbar } from "react-native-paper";
import { COLORS } from "../utils/theme";
import { Text } from "./primary/Text";

const Snack = props => {
  return (
    <Snackbar
      duration={Snackbar.DURATION_SHORT}
      theme={{
        roudness: 4,
        fonts: { regular: "montserratRegular", medium: "montserratMedium" },
        colors: {
          primary: COLORS.primary,
          surface: COLORS.background,
          background: COLORS.background,
          disabled: COLORS.muted,
          text: COLORS.gray
        }
      }}
      style={{
        backgroundColor: (props.color && props.color) || COLORS.odd,
     
      }}
      {...props}
    >
      {props.children}
    </Snackbar>
  );
};

export default Snack;
