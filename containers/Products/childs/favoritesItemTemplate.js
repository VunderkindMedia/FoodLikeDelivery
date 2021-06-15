import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Styles } from "../../../assets/Styles";
import { BASE_URL } from "../../../dist/consts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { CANCEL, DELETE, DELETE_QUESTION_TITLE } from "../../../dist/strings";
import { twoButtonAlert } from "../../../helpers/funcs";

export const favoritesItemTemplate = (item, removeFavorites, navigation) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.push("Product", {
          item: item,
        })
      }
      style={Styles.cart__item}
    >
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
          <Text style={Styles.cart__item_title}>{item.product_name}</Text>
          <Text style={Styles.cart__item_description}>
            {item.weight && item.weight.split("/")[0]}
          </Text>
        </View>
        <View style={Styles.cart__item_right_wrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cart__item_close_btn}
            onPress={() => {
              twoButtonAlert(
                DELETE_QUESTION_TITLE,
                "Вы действительно хотите удалить данный товар из любимых?",
                CANCEL,
                DELETE,
                () => removeFavorites(item)
              );
            }}
          >
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>
          <View style={Styles.cart__item_price_wrapper}>
            <Text style={Styles.cart__item_price}>
              {(item.price[1] / 100).toFixed(2)}₽
            </Text>
          </View>
        </View>
      </View>
      <View style={Styles.cart__item_devider}></View>
    </TouchableOpacity>
  );
};
