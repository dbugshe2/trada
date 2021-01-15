import AsyncStorage from '@react-native-community/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// for secure storage
const storeParams = {
  keychainService: 'trada_app_ios_secure_storage',
  sharedPreferencesName: 'trada_app_android_secure_storage',
};

export const getUserToken = async () => {
  try {
    const token = await EncryptedStorage.getItem(TOKEN_KEY);

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
    await EncryptedStorage.setItem(TOKEN_KEY, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const removeUserToken = async () => {
  try {
    await EncryptedStorage.removeItem(TOKEN_KEY);
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
