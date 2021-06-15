import {
  SET_START_LOADING,
  CHANGE_CART,
  GET_CATEGORIES,
  SET_NOTIFICATION,
  SET_PUSH_TOKEN,
  GET_PRODUCTS,
  CHANGE_FAVORITES,
  SET_STORAGE_PHONE,
  GET_CLIENT,
  GET_PROMOUTIONS_PRODUCTS,
  SET_ADDRESSES,
  SET_CHECKED_ADDRESS,
  SET_CHECKED_PAY,
  SET_CHECKED_TIME,
  SET_SETTINGS,
  SET_NAV_REF,
  SET_COMMENT_VALUE,
  SET_ORDERS,
  SET_TRANSACTION,
  SET_ORDERS_PRODUCTS,
  SET_REPLACE_VALUE,
  SET_ERROR,
  FONTS_READY,
} from "./types";
import { formatDate } from "../../helpers/funcs";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timezone: "UTC",
};
export const initialState = {
  error: {
    isError: false,
    handler: undefined,
  },
  navRef: null,
  fontsReady: false,
  start_loading: true,
  storage_phone: undefined,
  categories: [],
  products: [],
  orders: [],
  cartList: [],
  favorites: [],
  client: {},
  expoPushToken: "",
  notification: false,
  promoProducts: [],
  addresses: [],
  checked_address: null,
  comment_value: "",
  checked_pay: null,
  transaction: {},
  orderProducts: [],
  checked_time: {
    date: null,
    time: null,
    value: "",
  },
  // pays: ["Онлайн оплата", "Оплата картой куръеру", "Наличные"],
  pays: ["Оплата картой куръеру", "Наличные"],
  deliveryTimeList: [
    {
      title: "10:00 - 12:00",
      timeFrom: 10,
      timeTo: 12,
    },
    {
      title: "12:00 - 14:00",
      timeFrom: 12,
      timeTo: 14,
    },
    {
      title: "14:00 - 16:00",
      timeFrom: 14,
      timeTo: 16,
    },
    {
      title: "16:00 - 18:00",
      timeFrom: 16,
      timeTo: 18,
    },
    {
      title: "18:00 - 20:00",
      timeFrom: 18,
      timeTo: 20,
    },
    {
      title: "20:00 - 22:00",
      timeFrom: 20,
      timeTo: 22,
    },
  ],
  deliveryDates: [
    {
      title: "Сегодня",
      key: "today",
      date: formatDate(
        new Date(new Date().getTime() + 0 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: "Завтра",
      key: "tomorow",
      date: formatDate(
        new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: formatDate(
        new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
      ), //+3 дня к текущему = 8 апреля
      key: "day3",
      date: formatDate(
        new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: formatDate(
        new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
      ),
      key: "day4",
      date: formatDate(
        new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: formatDate(
        new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
      ),
      key: "day5",
      date: formatDate(
        new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: formatDate(
        new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
      ),
      key: "day6",
      date: formatDate(
        new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
      ),
    },
    {
      title: formatDate(
        new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
      ),
      key: "day7",
      date: formatDate(
        new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000)
      ),
    },
  ],
  settings: {},
  replaceValues: [
    "Позвонить мне. Подобрать замену, если не смогу ответить",
    "Позвонить мне. Убрать из заказа, если не смогу ответить",
    "Не звонить мне. Подобрать замену",
    "Не звонить мне. Убрать из заказа",
  ],
  replaceValue: "",
};

export default function AppReducer(state, action) {
  switch (action.type) {
    case SET_STORAGE_PHONE:
      return { ...state, storage_phone: action.storage_phone };
    case FONTS_READY:
      return { ...state, fontsReady: action.fontsReady };
    case SET_START_LOADING:
      return { ...state, start_loading: action.start_loading };
    case GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    case CHANGE_FAVORITES:
      return { ...state, favorites: action.favorites };
    case CHANGE_CART:
      return { ...state, cartList: action.cartList };
    case GET_CLIENT:
      return { ...state, client: action.client };
    case SET_PUSH_TOKEN:
      return { ...state, expoPushToken: action.expoPushToken };
    case SET_NOTIFICATION:
      return { ...state, notification: action.notification };
    case GET_PROMOUTIONS_PRODUCTS:
      return { ...state, promoProducts: action.promoProducts };
    case SET_ADDRESSES:
      return { ...state, addresses: action.addresses };
    case SET_CHECKED_ADDRESS:
      return { ...state, checked_address: action.checked_address };
    case SET_CHECKED_PAY:
      return { ...state, checked_pay: action.checked_pay };
    case SET_CHECKED_TIME:
      return { ...state, checked_time: action.checked_time };
    case SET_SETTINGS:
      return { ...state, settings: action.settings };
    case SET_NAV_REF:
      return { ...state, navRef: action.navRef };
    case SET_COMMENT_VALUE:
      return { ...state, comment_value: action.comment_value };
    case SET_ORDERS:
      return { ...state, orders: action.orders };
    case SET_TRANSACTION:
      return { ...state, transaction: action.transaction };
    case SET_ORDERS_PRODUCTS:
      return { ...state, orderProducts: action.orderProducts };
    case SET_REPLACE_VALUE:
      return { ...state, replaceValue: action.replaceValue };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
