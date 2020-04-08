import { Clipboard } from 'react-native';

export const saveToClipboard = async (text) => {
  await Clipboard.setString(text);
};
