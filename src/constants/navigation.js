import { COLORS, SIZES, LINE_HEIGHTS, LETTERSPACING } from '../utils/theme';
export const headerStyles = {};

export const bottomBarStyles = {
  backgroundColor: COLORS.background,
  paddingBottom: SIZES.base,
};
export const topTabOptions = {
  activeTintColor: COLORS.primary,
  inactiveTintColor: COLORS.muted,
  indicatorStyle: { backgroundColor: COLORS.primary },
  labelStyle: {
    fontFamily: 'montserratMedium',
    fontSize: SIZES.small,
    lineHeight: LINE_HEIGHTS.fourteen,
    letterSpacing: LETTERSPACING.zero,
    textTransform: 'none',
  },
};
