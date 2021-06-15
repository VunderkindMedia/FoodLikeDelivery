import { AsyncStorage } from "react-native";

export default class Storage {
  setData = async (key, value) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  getData = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  clear = async () => {
    return await AsyncStorage.clear();
  };

  remove = async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      return false;
    }
  };
}
