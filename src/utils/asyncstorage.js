import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const getUserToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const setUserToken = async (data) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUserToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);

    if (user !== null) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const setUser = async (data) => {
  try {
    await AsyncStorage.setItem(USER_KEY, data);
  } catch (error) {
    throw new Error(error);
  }
};
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    throw new Error(error);
  }
};
