import Clipboard from '@react-native-community/clipboard';

export const saveToClipboard = async (text) => {
  await Clipboard.setString(text);
};
