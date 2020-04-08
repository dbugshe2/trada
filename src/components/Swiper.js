import React from "react";
import SwiperFlatlist from "react-native-swiper-flatlist";
import { COLORS } from "../utils/theme";

const Swiper = props => {
  const { children } = props;
  return (
    <SwiperFlatlist
      paginationActiveColor={COLORS.primary}
      paginationDefaultColor={COLORS.inactive}
      paginationStyleItem={{width: 8, height: 8}}
      autoplay={false}
      {...props}
    >
      {children}
    </SwiperFlatlist>
  );
};

export default Swiper;
