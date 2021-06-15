import * as Font from "expo-font";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { SET_PUSH_TOKEN } from "../context/app/types";
import { Alert } from "react-native";

export const makeRandomeCode = (length = 4) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const fixedPrice = (price, count = 1) => {
  return ((price / 100) * count).toFixed(2);
};

export const fontsLoading = async () => {
  return await Font.loadAsync({
    Gilroy_Black: require("../assets/fonts/Gilroy-Black.ttf"),
    Gilroy_BlackItalic: require("../assets/fonts/Gilroy-BlackItalic.ttf"),
    Gilroy_Bold: require("../assets/fonts/Gilroy-Bold.ttf"),
    Gilroy_BoldItalic: require("../assets/fonts/Gilroy-BoldItalic.ttf"),
    // Gilroy_ExtraBold: require('../assets/fonts/Gilroy-ExtraBold.ttf'),
    // Gilroy_ExtraBoldItalic: require('../assets/fonts/Gilroy-ExtraBoldItalic.ttf'),
    // Gilroy_Heavy: require('../assets/fonts/Gilroy-Heavy.ttf'),
    // Gilroy_HeavyItalic: require('../assets/fonts/Gilroy-HeavyItalic.ttf'),
    // Gilroy_Light: require('../assets/fonts/Gilroy-Light.ttf'),
    // Gilroy_LightItalic: require('../assets/fonts/Gilroy-LightItalic.ttf'),
    Gilroy_Medium: require("../assets/fonts/Gilroy-Medium.ttf"),
    Gilroy_MediumItalic: require("../assets/fonts/Gilroy-MediumItalic.ttf"),
    Gilroy_Regular: require("../assets/fonts/Gilroy-Regular.ttf"),
    Gilroy_RegularItalic: require("../assets/fonts/Gilroy-RegularItalic.ttf"),
    Gilroy_SemiBold: require("../assets/fonts/Gilroy-SemiBold.ttf"),
    Gilroy_SemiBoldItalic: require("../assets/fonts/Gilroy-SemiBoldItalic.ttf"),
    // Gilroy_Thin: require('../assets/fonts/Gilroy-Thin.ttf'),
    // Gilroy_ThinItalic: require('../assets/fonts/Gilroy-ThinItalic.ttf'),
    // Gilroy_UltraLight: require('../assets/fonts/Gilroy-UltraLight.ttf'),
    // Gilroy_UltraLightItalic: require('../assets/fonts/Gilroy-UltraLightItalic.ttf'),
  });
};

export const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    //return (await Notifications.getDevicePushTokenAsync()).data; // FCM
    return Notifications.getExpoPushTokenAsync();
  } else {
    alert("Must use physical device for Push Notifications");
    return;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const setNotificationHandler = () =>
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

export const addNotificationReceivedListener = (callback) => {
  console.log(callback);
  return Notifications.addNotificationReceivedListener((response) =>
    callback(response)
  );
};

export const addNotificationResponseReceivedListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener((response) =>
    callback(response)
  );
};

export const removeNotificationSubscription = (current) => {
  return Notifications.removeNotificationSubscription(current);
};

export const twoButtonAlert = (title, msg, titleCancel, titleOk, okPressed) =>
  Alert.alert(title, msg, [
    {
      text: titleCancel,
      style: "cancel",
    },
    { text: titleOk, onPress: () => okPressed() },
  ]);
export const formatDate = (date, year = false, delemiter = false) => {
  const monthNames = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const yearValue = date.getFullYear();

  if (year) {
    return day + " " + monthNames[monthIndex] + " " + yearValue;
  } else if (delemiter) {
    return yearValue + "-" + (monthIndex + 1) + "-" + day;
  } else {
    return day + " " + monthNames[monthIndex];
  }
};

export const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) =>
  txt[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];

export const paginate = (array, page_size, page_number) => {
  return array.slice(0, page_number * page_size);
};

export const stringToDate = (_date, _format, _delimiter) => {
  const formatLowerCase = _format.toLowerCase();
  const formatItems = formatLowerCase.split(_delimiter);
  const dateItems = _date.split(_delimiter);
  const monthIndex = formatItems.indexOf("mm");
  const dayIndex = formatItems.indexOf("dd");
  const yearIndex = formatItems.indexOf("yyyy");
  let month = parseInt(dateItems[monthIndex]);
  month -= 1;
  const formatedDate = new Date(
    dateItems[yearIndex],
    month,
    dateItems[dayIndex]
  );
  return formatedDate;
};

/*
 * Javascript time conversion script
 * version 1.0
 * @requires jQuery
 * @author Modern Tribe, Inc. (Peter Chester)
 *
 * Converts several formats to a 2 point float. Accepted formats include:
 * 1.3333333333
 * 1h 10m
 * 1:10
 * 1
 *
 * Entries over 15 hours are assumed to be 15 minutes.
 */

export function filterTimeFormat(time) {
  // Number of decimal places to round to
  let hours;
  let minutes;
  const decimal_places = 2;

  // Maximum number of hours before we should assume minutes were intended. Set to 0 to remove the maximum.
  const maximum_hours = 15;

  // 3
  const int_format = time.match(/^\d+$/);

  // 1:15
  const time_format = time.match(/([\d]*):([\d]+)/);

  // 10m
  const minute_string_format = time.toLowerCase().match(/([\d]+)m/);

  // 2h
  const hour_string_format = time.toLowerCase().match(/([\d]+)h/);

  if (time_format != null) {
    hours = parseInt(time_format[1]);
    minutes = parseFloat(time_format[2] / 60);
    time = hours + minutes;
  } else if (minute_string_format != null || hour_string_format != null) {
    if (hour_string_format != null) {
      hours = parseInt(hour_string_format[1]);
    } else {
      hours = 0;
    }
    if (minute_string_format != null) {
      minutes = parseFloat(minute_string_format[1] / 60);
    } else {
      minutes = 0;
    }
    time = hours + minutes;
  } else if (int_format != null) {
    // Entries over 15 hours are likely intended to be minutes.
    time = parseInt(time);
    if (maximum_hours > 0 && time > maximum_hours) {
      time = (time / 60).toFixed(decimal_places);
    }
  }

  // make sure what ever we return is a 2 digit float
  time = parseFloat(time).toFixed(decimal_places);

  return time;
}

export const status_string = (status) => {
  if (status === "open") {
    return "Принят";
  } else if (status === "accept") {
    return "Готовится";
  } else if (status === "ready") {
    return "Собран";
  } else if (status === "delivery_start") {
    return "В пути";
  } else if (status === "delivery_end") {
    return "Доставлен";
  } else if (status === "end") {
    return "Выполнен";
  }
};
