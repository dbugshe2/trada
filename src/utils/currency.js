/**
 * Javascript Currency Formatter.
 *
 * This is the JavaScript widget used only IDR and USD.
 * You can change according to your needs.
 *
 * Has implemented in React Native version 0.53.0
 *
 * @link https://github.com/haifahrul/react-native-currency-formatter
 * @copyright Copyright (c) 2018 Afsyah.com
 * @license GPU
 * @author haifahrul <haifahrul@gmail.com>
 * @since 1.0
 */

const currencyCode = '\u20A6'; // IDR or USD
const currencyPosition = 'left'; // left or right
const maxFractionDigits = 0;
const decimalSeparator = '.';
const thousandSeparator = ',';

function position(currencyPosition, value) {
  return currencyPosition === 'left'
    ? `${currencyCode}${value}`
    : `${value}${currencyCode}`;
}

export const CurrencyFormatter = (value) => {
  const string = 'string';
  let result;

  if (
    value === 0 ||
    value === null ||
    value === undefined ||
    value === '0' ||
    typeof value === string
  ) {
    return position(currencyPosition, 0);
  }

  const valueSplit = String(value.toFixed(maxFractionDigits)).split(
    `${thousandSeparator}`
  );
  const firstvalue = valueSplit[0];
  const secondvalue = valueSplit[1];
  const valueReal = String(firstvalue).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    `${thousandSeparator}`
  );

  if (Number(secondvalue) > 0) {
    result = position(
      currencyPosition,
      `${valueReal}${thousandSeparator}${secondvalue}`
    );
  } else {
    result = position(currencyPosition, `${valueReal}`);
  }

  return result;
};

export const NumberFormatter = (value) => {
  const string = 'string';
  let result;

  if (
    value === 0 ||
    value === null ||
    value === undefined ||
    value === '0' ||
    typeof value === string
  ) {
    return '0';
  }

  const valueSplit = String(value).split(`${thousandSeparator}`);
  const firstvalue = valueSplit[0];
  const secondvalue = valueSplit[1];
  const valueReal = String(firstvalue).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    `${thousandSeparator}`
  );

  if (Number(secondvalue) > 0) {
    result = `${valueReal}${thousandSeparator}${secondvalue}`;
  } else {
    result = `${valueReal}`;
  }

  return result;
};
