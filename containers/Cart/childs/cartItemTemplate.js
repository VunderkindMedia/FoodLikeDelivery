import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Styles } from "../../../assets/Styles";
import { BASE_URL } from "../../../dist/consts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  CANCEL,
  DELETE,
  DELETE_QUESTION_MSG,
  DELETE_QUESTION_TITLE,
} from "../../../dist/strings";
import { fixedPrice, twoButtonAlert } from "../../../helpers/funcs";

export const cartItemTemplate = (
  item,
  removeCart,
  changeCartIncrement,
  changeCartDecrement,
  navigation
) => {
  return (
    <View style={Styles.cart__item}>
      <View style={Styles.cart__item_wrapper}>
        <View style={Styles.cart_item_image_wrapper}>
          <Image
            style={Styles.cart__item_image}
            source={
              item.photo
                ? { uri: BASE_URL + item.photo }
                : require("../../../assets/no-photo.png")
            }
          />
        </View>
        <View style={Styles.cart__item_center}>
          <Text
            style={Styles.cart__item_title}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.product_name}
          </Text>
          <Text style={Styles.cart__item_description}>
            {item.weight && item.weight.split("/")[0]}
          </Text>
          <View style={Styles.cart__item_btns_wrapper}>
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={item.count === 1}
              style={Styles.cart__item_btn}
              onPress={() => changeCartDecrement(item)}
            >
              <AntDesign name="minus" size={24} color="gray" />
            </TouchableOpacity>
            <View style={Styles.cart__item_counter_wrapper}>
              <Text style={Styles.cart__item_counter}>{item.count}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.cart__item_btn}
              onPress={() => changeCartIncrement(item)}
            >
              <AntDesign name="plus" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.cart__item_right_wrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cart__item_close_btn}
            onPress={() => {
              twoButtonAlert(
                DELETE_QUESTION_TITLE,
                "Вы действительно хотите удалить данный товар?",
                CANCEL,
                DELETE,
                () => removeCart(item)
              );
            }}
          >
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
          <View style={Styles.cart__item_price_wrapper}>
            {item.discountPrice && (
              <Text style={Styles.cart__item_price_old}>
                {fixedPrice(item.price["1"]) * item.count}₽.
              </Text>
            )}
            <Text style={Styles.cart__item_price}>
              {item.discountPrice
                ? Number(fixedPrice(item.discountPrice) * item.count).toFixed(2)
                : Number(fixedPrice(item.price["1"]) * item.count).toFixed(2)}
              ₽
            </Text>
          </View>
        </View>
      </View>
      <View style={Styles.cart__item_devider}></View>
    </View>
  );
};
