import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: '#91CC42',
  secondary: '#3088D5',
  odd: '#F4FAED',
  background: '#FFFFFF',
  error: '#B00020',

  // non-colors
  black: '#000020',
  white: '#FFFFFF',

  // color variations
  gray: '#3F3F3F',
  lightgray: '#F4F4F4',
  muted: '#A8A8A8',
  inactive: '#DBDBDB',
};

export const SIZES = {
  // global sizes
  base: 4,
  radius: 4,
  padding: 16,
  btnRadius: 11,
  cardRadius: 4,

  // font sizes
  h1: 34,
  h2: 24,
  h3: 22,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 14,
  small: 12,
  tiny: 8,

  // app dimensions
  width,
  height,
};

export const LINE_HEIGHTS = {
  // line height
  ten: 10,
  fourteen: 14,
  fiften: 15,
  sixteen: 16,
  seventeen: 17,
  ninteen: 19,
  twenty: 20,
  twenty_1: 21,
  twenty_4: 24,
  twenty_9: 29,
  thirty_4: 34,
  fourty_1: 41,
};

export const LETTERSPACING = {
  // line spacing
  zero: 0,
  point_15: 0.15,
  point_25: 0.25,
  point_35: 0.35,
  point_4: 0.4,
  two_point_4: 2.4,
};
export const WEIGHTS = {
  regular: 'normal',
  bold: 'bold',
  semibold: '500',
  medium: '400',
  light: '300',
};

export const STYLES = {
  header1: { fontSize: SIZES.h1, letterHeight: LINE_HEIGHTS.fourty_1 },
  header2: { fontSize: SIZES.h4, letterHeight: LINE_HEIGHTS.twenty_4 },
  header3: { fontSize: SIZES.body, letterHeight: LINE_HEIGHTS.fiften },
  body1: { fontSize: SIZES.body, letterHeight: LINE_HEIGHTS.fourteen },
  title1: { fontSize: SIZES.h4, letterHeight: LINE_HEIGHTS.twenty_4 },
  title2: { fontSize: SIZES.body, letterHeight: LINE_HEIGHTS.fiften },
  titleList: { fontSize: SIZES.list, letterHeight: LINE_HEIGHTS.twenty_4 },
  subtitle: { fontSize: SIZES.body, letterHeight: LINE_HEIGHTS.fiften },
  // experimenting with some font styles
  title: {},
  backTitle: {},
  cardTitle: {},
  cardSubHeading: {},
  cardBody: {},
  cardFooter: {},
  listKey: {},
  listValue: {},
  listItem: {},
  body: {},
};
export const FONTS = {
  h1: { fontSize: SIZES.h1 },
  h2: { fontSize: SIZES.h2 },
  h3: { fontSize: SIZES.h3 },
  h4: { fontSize: SIZES.h4 },
  h5: { fontSize: SIZES.h5 },
  h6: { fontSize: SIZES.h6 },
  title: { fontSize: SIZES.title },
  backTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: SIZES.h4,
    lineHeight: LINE_HEIGHTS.twenty_4,
    color: COLORS.black,
  },
  subtitle: { fontSize: SIZES.subtitle },
  body: { fontSize: SIZES.body },
  caption: { fontSize: SIZES.caption },
  small: { fontSize: SIZES.small },
  tiny: { fontSize: SIZES.tiny },
};
