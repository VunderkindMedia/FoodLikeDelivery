import { StackActions } from "@react-navigation/native";
import moment from "moment-timezone";
import React, { useReducer, useEffect, useRef, useLayoutEffect } from "react";
import Toast from "react-native-toast-message";
import { AppContext } from "./AppContext";
import AppReducer, { initialState } from "./AppReducer";
import {
  SET_START_LOADING,
  FONTS_READY,
  GET_CATEGORIES,
  GET_PRODUCTS,
  CHANGE_FAVORITES,
  SET_PUSH_TOKEN,
  SET_STORAGE_PHONE,
  CHANGE_CART,
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
} from "./types";
import { API_URL, API_TOKEN, SMS_TOKEN, API_BACK_URL } from "../../dist/consts";
import Storage from "../../helpers/storage";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  fontsLoading,
  registerForPushNotificationsAsync,
  removeNotificationSubscription,
  setNotificationHandler,
} from "../../helpers/funcs";

export const AppState = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const firstUpdate = useRef(true);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);
  const storage = new Storage();

  useEffect(() => {
    fontsLoading().then(() => {
      dispatch({
        type: FONTS_READY,
        fontsReady: true,
      });
      console.log("Шрифты загружены");
      registerForPushNotificationsAsync().then((token) => {
        dispatch({ type: SET_PUSH_TOKEN, expoPushToken: token.data });
        storage.getData("storage_phone").then((value) => {
          dispatch({
            type: SET_STORAGE_PHONE,
            storage_phone: value,
          });
        });
        storage.getData("favorites").then((value) => {
          value &&
            dispatch({
              type: CHANGE_FAVORITES,
              favorites: JSON.parse(value),
            });
        });
        storage.getData("cartList").then((value) => {
          value &&
            dispatch({
              type: CHANGE_CART,
              cartList: JSON.parse(value),
            });
        });
        storage.getData("addresses").then((value) => {
          value &&
            dispatch({
              type: SET_ADDRESSES,
              addresses: JSON.parse(value),
            });
          console.log(value);
        });
        storage.getData("checked_address").then((value) => {
          value &&
            dispatch({
              type: SET_CHECKED_ADDRESS,
              checked_address: JSON.parse(value),
            });
        });
        storage.getData("checked_pay").then((value) => {
          value &&
            dispatch({
              type: SET_CHECKED_PAY,
              checked_pay: JSON.parse(value),
            });
        });
      });
      notificationListener.current = addNotificationReceivedListener(
        (notification) => {
          console.log(notification);
        }
      );
      responseListener.current = addNotificationResponseReceivedListener();
      setNotificationHandler();
    });
  }, []);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log("Главная загрузка завершена");
    dispatch({
      type: SET_START_LOADING,
      start_loading: false,
    });
    return () => {
      removeNotificationSubscription(notificationListener.current);
      removeNotificationSubscription(responseListener.current);
    };
  }, [state.storage_phone]);

  useEffect(() => {
    getProducts().then(() => console.log("Продукты загружены"));
    getCategories().then(() => console.log("Категории загружены"));
    getSettings().then(() => console.log("Настройки загружены"));
    getOrders().then(() => console.log("Заказы загружены"));
  }, []);

  const setError = (e) => {
    dispatch({
      type: SET_ERROR,
      error: e,
    });
  };

  const getSettings = async () => {
    const url = `${API_BACK_URL}/api/settings/get`;
    return fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setError(null);
        if (response.data.mobile_app_enabled === "1") {
          dispatch({
            type: SET_SETTINGS,
            settings: response.data,
          });
        } else {
          setError("Ведутся технические работы");
        }
      })
      .catch((e) => {
        setError("Ошибка при загрузке данных");
      });
  };

  const setStoragePhone = (phone) => {
    console.log("storage_phone", phone);
    storage.setData("storage_phone", String(phone)).then(() => {
      dispatch({
        type: SET_STORAGE_PHONE,
        storage_phone: phone,
      });
    });
  };

  const setNavRef = (navRef) => {
    dispatch({
      type: SET_NAV_REF,
      navRef: navRef,
    });
  };

  const logOut = () => {
    storage.remove("storage_phone").then(() => {
      state.navRef.current.dispatch(StackActions.replace("Welcome"));
    });
  };

  const getCategories = async () => {
    const data = {};
    data.token = API_TOKEN;
    const url = `${API_URL}menu.getCategories?${new URLSearchParams(data)}`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        dispatch({
          type: GET_CATEGORIES,
          categories: result.response.filter(
            (cat) => cat.category_hidden !== "1"
          ),
        });
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const getProducts = async (data = {}) => {
    data.token = API_TOKEN;
    // const url = `${API_URL}menu.getProducts?${new URLSearchParams(data)}`;
    const url = `${API_BACK_URL}/api/products/get`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        getPromoProducts().then((promos) => {
          const nowDate = moment().tz("Asia/Sakhalin").valueOf();
          result.data = result.data.map((item) => {
            promos.response.forEach((promo) => {
              if (
                promo.params.conditions.some(
                  (product) => product.id == item.product_id
                ) &&
                moment(promo.date_start)
                  .utc(true)
                  .utcOffset("+0800")
                  .isBefore(nowDate) &&
                moment(promo.date_end)
                  .utc(true)
                  .utcOffset("+0800")
                  .isAfter(nowDate)
              ) {
                item.discountPrice =
                  Number.parseInt(item.price["1"]) -
                  (Number.parseInt(item.price["1"]) *
                    Number.parseInt(promo.params.discount_value)) /
                    100;
              }
            });
            return item;
          });
          dispatch({
            type: GET_PRODUCTS,
            products: result.data,
          });
        });

        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const getOrders = async () => {
    const url = `${API_BACK_URL}/api/orders/get?client_id=${state.client.client_id}`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        dispatch({
          type: SET_ORDERS,
          orders: result.data,
        });
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const getTransaction = async (id) => {
    const url = `${API_URL}dash.getTransaction?
    token=${API_TOKEN}&
    transaction_id=${id}&
    include_products=true&
    include_delivery=true`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        dispatch({
          type: SET_TRANSACTION,
          transaction: result.response[0],
        });
        dispatch({
          type: SET_ORDERS_PRODUCTS,
          orderProducts: {
            products: result.response[0].products.map((product) => {
              return {
                ...product,
                fromArrayProduct: state.products.find(
                  (item) => item.product_id == product.product_id
                ),
              };
            }),
            resultSum: result.response[0].products.reduce((accum, product) => {
              const discount = (product) =>
                state.products.find(
                  (item) => item.product_id === product.product_id
                )?.discountPrice;
              console.log("+accum.product_price", accum);
              return (
                accum +
                (discount(product)
                  ? +discount(product) * product.num
                  : +product.product_price)
              );
            }, 0),
          },
        });
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const addCart = (product, count = 1) => {
    product.count = count;
    const tempCartList = state.cartList;
    tempCartList.push(product);
    dispatch({
      type: CHANGE_CART,
      cartList: tempCartList,
    });
    Toast.show({
      text1: `Товар добавлен в корзину`,
      type: "success",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
    storage.setData("cartList", JSON.stringify(tempCartList));
  };

  const removeCart = (product) => {
    const tempCartList = state.cartList.filter(
      (item) => item.product_id !== product.product_id
    );
    dispatch({
      type: CHANGE_CART,
      cartList: tempCartList,
    });
    storage.setData("cartList", JSON.stringify(tempCartList));
  };
  const clearOrder = async () => {
    return new Promise((resolve) => {
      dispatch({
        type: CHANGE_CART,
        cartList: [],
      });
      dispatch({
        type: SET_CHECKED_TIME,
        checked_time: {
          date: null,
          time: null,
          value: "",
        },
      });
      storage.setData("cartList", JSON.stringify([]));
      resolve();
    });
  };

  const priceCart = () => {
    let price = 0;
    state.cartList.forEach((item) => {
      price =
        price +
        ((item.discountPrice ? item.discountPrice : item.price[1]) / 100) *
          item.count;
    });
    return price.toFixed(2);
  };
  const weightCart = (gramm) => {
    let weight = 0;
    state.cartList.forEach((item) => {
      weight = weight + (item.weight && item.weight.split("/")[1] * item.count);
    });
    if (gramm) {
      console.log(weight);
      return weight;
    } else {
      return weight / 1000;
    }
  };

  const priceDelivery = () => {
    let price = 0;
    const address = state.addresses[state.checked_address];
    if (address && address.floor) {
      const floorPrice = address.floor * 15;
      const weightPrice = weightCart() * 5;
      price = 100 + floorPrice + weightPrice;
    }

    return price;
  };

  const cartListCount = () => {
    let count = 0;
    state.cartList.forEach((item) => {
      count = count + item.count;
    });
    return count;
  };

  const getPromoProducts = () => {
    const data = {};
    data.token = API_TOKEN;
    const url = `${API_URL}clients.getPromotions?${new URLSearchParams(data)}`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        dispatch({
          type: GET_PROMOUTIONS_PRODUCTS,
          promoProducts: result.response,
        });
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const changeCartDecrement = (product, counter = 1) => {
    const tempCartList = state.cartList;
    const productIndex = tempCartList.findIndex(
      (item) => item.product_id == product.product_id
    );
    if (tempCartList[productIndex].count != 1) {
      tempCartList[productIndex].count -= counter;
      dispatch({
        type: CHANGE_CART,
        cartList: tempCartList,
      });
      storage.setData("cartList", JSON.stringify(tempCartList));
    }
  };

  const changeCartIncrement = (product, counter = 1) => {
    console.log("click");
    const tempCartList = state.cartList;
    const productIndex = tempCartList.findIndex(
      (item) => item.product_id == product.product_id
    );
    tempCartList[productIndex].count += counter;
    dispatch({
      type: CHANGE_CART,
      cartList: tempCartList,
    });
    storage.setData("cartList", JSON.stringify(tempCartList));
  };

  const orderCreate = (order) => {
    const url = `${API_URL}incomingOrders.createIncomingOrder?token=${API_TOKEN}`;
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {})
      .catch((e) => {
        throw e;
      });
  };

  const addFavorites = (product) => {
    const tempFavorites = state.favorites;
    tempFavorites.push(product.product_id);
    dispatch({
      type: CHANGE_FAVORITES,
      favorites: tempFavorites,
    });
    storage.setData("favorites", JSON.stringify(tempFavorites));
  };

  const removeFavorites = (product) => {
    const tempFavorites = state.favorites.filter(
      (id) => id !== product.product_id
    );
    dispatch({
      type: CHANGE_FAVORITES,
      favorites: tempFavorites,
    });
    storage.setData("favorites", JSON.stringify(tempFavorites));
  };

  const isFavorite = (product) => {
    if (state.favorites.find((id) => id === product.product_id)) {
      return true;
    } else {
      return false;
    }
  };

  const findClient = async (data) => {
    data.token = API_TOKEN;
    const url = `${API_URL}clients.getClients?${new URLSearchParams(data)}`;
    console.log(url);
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        if (result.response.length === 1) {
          dispatch({
            type: GET_CLIENT,
            client: result.response[0],
          });
        }
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const setClient = async (data) => {
    dispatch({
      type: GET_CLIENT,
      client: data,
    });
  };

  const saveClient = async () => {
    const url = `${API_URL}clients.updateClient?token=${API_TOKEN}`;
    const client = {
      client_id: state.client.client_id,
      client_name: `${state.client.firstname} ${state.client.lastname}`,
      email: state.client.email,
      birthday: state.client.birthday,
      client_sex: state.client.client_sex,
    };
    const body = new FormData();
    Object.keys(client).forEach((key, index) => {
      body.append(key, client[key]);
    });
    return fetch(url, {
      method: "POST",
      body: body,
    })
      .then((result) => result.json())
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const getClient = async (id) => {
    const data = {};
    data.token = API_TOKEN;
    data.client_id = id;
    const url = `${API_URL}clients.getClients?${new URLSearchParams(data)}`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => {
        if (result.response.length === 1) {
          dispatch({
            type: GET_CLIENT,
            client: result.response[0],
          });
        }
        return result;
      })
      .catch((error) => {
        throw e;
      });
  };

  const addClient = async (data) => {
    const url = `${API_URL}clients.createClient?token=${API_TOKEN}`;
    let body = new FormData();
    data.client_name = "Имя";
    data.client_groups_id_client = 1;

    Object.keys(data).forEach((key, index) => {
      body.append(key, data[key]);
    });

    return fetch(url, {
      method: "POST",
      body: body,
    })
      .then((result) => result.json())
      .then((result) => {
        return result;
      })
      .catch((e) => {
        throw e;
      });
  };

  const addPushClient = (client_phone) => {
    const url = `${API_BACK_URL}/api/clients/add?client_phone=${client_phone}&token=${state.expoPushToken}&os=android`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => console.log(result));
  };

  const sendSMS = async (code, phone) => {
    const url = `https://sms.ru/sms/send?api_id=${SMS_TOKEN}&to=${phone}&msg=Одноразовый код: ${code}&json=1&from=doDoma`;
    return fetch(url)
      .then((result) => result.json())
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  };

  const addAddress = async (address) => {
    return new Promise((resolve) => {
      const tempArray = state.addresses;
      tempArray.push(address);
      dispatch({
        type: SET_ADDRESSES,
        addresses: tempArray,
      });
      storage.setData("addresses", JSON.stringify(tempArray));
      resolve();
    });
  };

  const deleteAddress = async (index) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_ADDRESSES,
        addresses: state.addresses.filter((item, i) => i !== index),
      });
      storage.setData(
        "addresses",
        JSON.stringify(state.addresses.filter((item, i) => i !== index))
      );
      resolve();
    });
  };

  const editAddress = (address, index) => {
    console.log();
    return new Promise((resolve) => {
      dispatch({
        type: SET_ADDRESSES,
        addresses: state.addresses.map((item, i) => {
          if (index == i) {
            item = address;
            return item;
          }
          return item;
        }),
      });
      storage.setData(
        "adressess",
        JSON.stringify(
          state.addresses.map((item, i) => {
            if (index == i) {
              item = address;
              return item;
            }
          })
        )
      );
      resolve();
    });
  };

  const setCheckedAddress = async (index) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_CHECKED_ADDRESS,
        checked_address: index,
      });
      storage.setData("checked_address", JSON.stringify(index));
      resolve();
    });
  };
  const setCheckedPay = async (index) => {
    return new Promise((resolve) => {
      dispatch({
        type: SET_CHECKED_PAY,
        checked_pay: index,
      });
      storage.setData("checked_pay", JSON.stringify(index));
      resolve();
    });
  };
  const setCheckedTime = async (dateIndex, index) => {
    const tempObj = {
      date: dateIndex, //передаю индекс окна- в таб навигации это индекс окна, так как она генерирует окна по массиву с датами)
      time: index, //индекс в списке выбора времени
      value: `${state.deliveryDates[dateIndex].date} (${state.deliveryTimeList[index].title})`,
    };
    return new Promise((resolve) => {
      dispatch({
        type: SET_CHECKED_TIME,
        checked_time: tempObj,
      });
      resolve();
    });
  };

  const setCommentValue = (value) => {
    dispatch({
      type: SET_COMMENT_VALUE,
      comment_value: value,
    });
  };

  const setReplaceValue = (value) => {
    dispatch({
      type: SET_REPLACE_VALUE,
      replaceValue: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        getCategories,
        getProducts,
        findClient,
        getClient,
        addClient,
        setStoragePhone,
        start_loading: state.start_loading,
        storage_phone: state.storage_phone,
        categories: state.categories,
        products: state.products,
        cartList: state.cartList,
        favorites: state.favorites,
        client: state.client,
        expoPushToken: state.expoPushToken,
        addresses: state.addresses,
        checked_address: state.checked_address,
        checked_pay: state.checked_pay,
        pays: state.pays,
        deliveryTimeList: state.deliveryTimeList,
        deliveryDates: state.deliveryDates,
        checked_time: state.checked_time,
        settings: state.settings,
        navRef: state.navRef,
        comment_value: state.comment_value,
        orders: state.orders,
        transaction: state.transaction,
        orderProducts: state.orderProducts,
        replaceValue: state.replaceValue,
        replaceValues: state.replaceValues,
        error: state.error,
        fontsReady: state.fontsReady,
        getSettings,
        addCart,
        removeCart,
        priceCart,
        cartListCount,
        changeCartDecrement,
        changeCartIncrement,
        addFavorites,
        removeFavorites,
        isFavorite,
        sendSMS,
        addPushClient,
        addAddress,
        deleteAddress,
        editAddress,
        setCheckedAddress,
        setCheckedPay,
        setCheckedTime,
        logOut,
        setNavRef,
        saveClient,
        setClient,
        priceDelivery,
        setCommentValue,
        orderCreate,
        weightCart,
        clearOrder,
        getOrders,
        getTransaction,
        setReplaceValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
