import React, { useContext } from "react";
import { Styles } from "../../../assets/Styles";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { BASE_URL, SPOT_ID } from "../../../dist/consts";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import SkeletonContent from "react-native-skeleton-content";
import { AppContext } from "../../../context/app/AppContext";
import { fixedPrice } from "../../../helpers/funcs";
import { DiscountView } from "./DiscoundView";

export const productsItemTemplate = (
  item,
  loading,
  navigation,
  cartList,
  addCart,
  changeCartIncrement,
  horizontal = false
) => {
  return (
    // !loading ?
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Product", {
          item: item,
        })
      }
      activeOpacity={0.8}
      style={[
        Styles.products__container,
        horizontal && {
          width: (Dimensions.get("window").width * 40) / 100,
        },
      ]}
    >
      {item.discountPrice && (
        <DiscountView
          discountPrice={item.discountPrice}
          normalPrice={item.price[1]}
        />
      )}
      {item.color === "orange" && !horizontal && <DiscountView recomend />}
      <Image
        resizeMode={"contain"}
        style={[
          Styles.products__item_image,
          horizontal && { height: 80, width: 80 },
        ]}
        source={
          item.photo
            ? { uri: BASE_URL + item.photo }
            : require("../../../assets/no-photo.png")
        }
      />
      <Text
        style={Styles.products__item_title}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.product_name}
      </Text>
      <Text style={Styles.products__item_description}>
        {(item.weight && item.weight.split("/")[0]) || "Описание отсутствует"}
      </Text>
      <View style={Styles.products__item_bottom_wrapper}>
        <View>
          {item.discountPrice && (
            <Text style={Styles.products__item_old_price}>
              {fixedPrice(item.price["1"])}₽
            </Text>
          )}
          <Text style={Styles.products__item_price}>
            {item.discountPrice
              ? fixedPrice(item.discountPrice)
              : fixedPrice(item.price["1"])}
            ₽
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            Styles.products__item_plus_btn,
            horizontal && { height: 32, width: 32, borderRadius: 10 },
          ]}
          onPress={() => {
            if (
              cartList.find((product) => product.product_id == item.product_id)
            ) {
              changeCartIncrement(item);
            } else {
              addCart(item);
            }
          }}
        >
          <AntDesign name="plus" size={horizontal ? 18 : 24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
    //:
    // <SkeletonContent
    //     containerStyle={Styles.categories__skeleton_item}
    //     isLoading={true}
    //     duration={2200}
    //     animationType={'shiver'}
    //     layout={[
    //       { key: 'someId', width: 102, height: 73, marginBottom: 6 },
    //       { key: 'someOtherId', width: 150, height: 20,marginTop: 27}
    //     ]} />
  );
};
