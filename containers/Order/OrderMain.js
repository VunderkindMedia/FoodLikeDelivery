import React, { useContext, useState, useRef } from "react";
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
import styles from "react-native-webview/lib/WebView.styles";
import { main_color } from "../../assets/Styles";
import { ModalContainer } from "../../components/ModalContainer";
import { orderPropsItems } from "./childs/orderPropsItems";
import { AppContext } from "../../context/app/AppContext";
import { AppButton } from "../../components/AppButton";
import { ActionModal } from "../../components/ActionModal";

export const OrderMain = ({ navigation }) => {
  const {
    addresses,
    checked_address,
    checked_pay,
    pays,
    setCheckedPay,
    checked_time,
    deliveryTimeList,
    deliveryDates,
    priceCart,
    priceDelivery,
    comment_value,
    cartList,
    orderCreate,
    storage_phone,
    weightCart,
    clearOrder,
    replaceValue,
    setReplaceValue,
    replaceValues,
  } = useContext(AppContext);
  const actionModalRef = useRef(null);
  const actionCommentModalRef = useRef(null);
  const replaceModal = useRef(null);
  const [loading, setLoading] = useState(false);

  const data = [
    {
      title: "Адрес доставки",
      value:
        (addresses[checked_address] && addresses[checked_address].name) ||
        "Не указано",
      error: !addresses[checked_address]?.name,
      onClick: () => navigation.navigate("Addresses"),
    },
    {
      title: "Способ оплаты",
      value: pays[checked_pay] || "не указано",
      error: !pays[checked_pay],
      onClick: () => actionModalRef.current?.setModalVisible(),
    },
    {
      title: "Время доставки",
      value:
        (checked_time.date !== null &&
          deliveryDates[checked_time.date].title +
            " (" +
            deliveryTimeList[checked_time.time].title +
            ")") ||
        "не указано",
      error: checked_time.date === null,
      onClick: () => navigation.navigate("DateTimeDelivery"),
    },
    {
      title: "Замены",
      value: replaceValue ? "указано" : "не указано",
      error: replaceValue === "",
      onClick: () => replaceModal.current?.setModalVisible(),
    },
    {
      title: "Комментарий к заказу",
      value: (comment_value && "посмотреть комментарий") || "не указано",
      onClick: () => actionCommentModalRef.current?.setModalVisible(),
    },
    {
      title: "Итоговая стоимость",
      value: `${(+priceCart() + priceDelivery()).toFixed(2)}₽`.replace(
        ".",
        ","
      ),
      onClick: () => {},
    },
  ];

  const sendHandler = () => {
    setLoading(true);
    const order = {
      client_address: {
        address1: addresses[checked_address].street,
        address2: `п. ${addresses[checked_address].entrance || "-"} э. ${
          addresses[checked_address].floor || "-"
        } кв. ${addresses[checked_address].apartment || "-"}`,
      },
      delivery_price: priceDelivery() * 100,
      products: cartList.map((item) => {
        return {
          product_id: item.product_id,
          count: item.count,
        };
      }),
      spot_id: 1,
      phone: storage_phone,
      service_mode: 3,
      comment: `Android: В: ${weightCart(true)} г., cпособ оплаты: ${
        pays[checked_pay]
      }, ВД: ${checked_time.value}, ${
        comment_value && "Комментарий клиента:" + comment_value
      }, Замены: ${replaceValue}`,
    };

    orderCreate(order).then(() => {
      setLoading(true);
      clearOrder().then(() => {
        navigation.navigate("OrderAccept");
      });
    });
  };

  return (
    <ModalContainer
      topOffset={60}
      navigation={navigation}
      title={"Оформление заказа"}
    >
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ActivityIndicator size={100} color={main_color} />
        </View>
      )}
      <FlatList
        data={data}
        renderItem={orderPropsItems}
        keyExtractor={(item) => item.title}
      />
      <Text></Text>
      <AppButton
        offerta={
          'Нажимая кнопку "Заказать", Вы соглашаетесь с публичной офертой для покупок в магазине доДома'
        }
        title={"Оформить заказ"}
        pressHandler={() => {
          if (
            checked_address === null ||
            checked_pay === null ||
            checked_time.value.length === 0 ||
            replaceValue === ""
          ) {
            Toast.show({
              text1: `Заполните все поля`,
              type: "error",
              visibilityTime: 2000,
              autoHide: true,
              topOffset: 60,
            });
          } else {
            sendHandler();
          }
        }}
        style={{ position: "absolute", left: 15, right: 15, bottom: 25 }}
      />
      <ActionModal
        ref={actionModalRef}
        items={pays}
        checkedValue={checked_pay}
        onChangeValue={(index) => setCheckedPay(index)}
      />
      <ActionModal ref={actionCommentModalRef} text={true} />
      <ActionModal
        ref={replaceModal}
        items={replaceValues}
        checkedValue={replaceValue}
        onChangeValue={(index) => setReplaceValue(replaceValues[index])}
      />
    </ModalContainer>
  );
};
