import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Share,
} from "react-native";
import ScalableText from "react-native-text";
import { Styles } from "../../assets/Styles";
import { BASE_URL } from "../../dist/consts";
import { HeaderButton } from "../../navigation/childs/HeaderButton";
import { AntDesign } from "@expo/vector-icons";
import { AppContext } from "../../context/app/AppContext";
import { AppButton } from "../../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import { fixedPrice } from "../../helpers/funcs";

export const Product = ({ route, navigation }) => {
  const item = route.params.item;
  const {
    addCart,
    changeCartIncrement,
    cartList,
    addFavorites,
    removeFavorites,
    favorites,
    isFavorite,
  } = useContext(AppContext);
  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: item.product_name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          top: 45,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 1,
        }}
      >
        <HeaderButton onPress={() => navigation.goBack()} />
        <HeaderButton onPress={() => onShare()} style={{ marginRight: 25 }}>
          <Ionicons name="share-outline" size={24} color="black" />
        </HeaderButton>
      </View>
      <View
        style={{
          height: Dimensions.get("window").width,
          width: "100%",
          // backgroundColor: "#f2f3f2",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: null,
            flex: 0.55,
            resizeMode: "contain",
          }}
          source={
            item.photo
              ? { uri: BASE_URL + item.photo }
              : require("../../assets/no-photo.png")
          }
        />
      </View>
      <ScrollView>
        <View style={{ paddingVertical: 30, paddingHorizontal: 25 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }}>
              <ScalableText style={{ fontFamily: "Gilroy_Bold", fontSize: 20 }}>
                {item.product_name}
              </ScalableText>
              <Text
                style={{
                  fontFamily: "Gilroy_Medium",
                  fontSize: 16,
                  color: "#7C7C7C",
                  marginTop: 10.5,
                }}
              >
                {item.weight && item.weight.split("/")[0]}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ padding: 4 }}
              onPress={() => {
                if (isFavorite(item)) {
                  removeFavorites(item);
                } else {
                  addFavorites(item);
                }
              }}
            >
              <AntDesign
                name={isFavorite(item) ? "heart" : "hearto"}
                size={24}
                color={isFavorite(item) ? "red" : "#7c7c7c"}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 30,
              borderBottomWidth: 1,
              borderColor: "#e2e2e2",
              marginBottom: 18,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={count == 1}
                onPress={() => {
                  setCount(count - 1);
                }}
              >
                <AntDesign name="minus" size={24} color="gray" />
              </TouchableOpacity>
              <View style={[Styles.cart__item_btn, { marginHorizontal: 25 }]}>
                <Text>{count}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setCount(count + 1);
                }}
              >
                <AntDesign name="plus" size={24} color="green" />
              </TouchableOpacity>
            </View>
            <View>
              {item.discountPrice && (
                <Text
                  style={{
                    fontFamily: "Gilroy_Bold",
                    fontSize: 20,
                    color: "#7c7c7c",
                    textDecorationLine: "line-through",
                  }}
                >
                  {fixedPrice(item.price["1"])} руб
                </Text>
              )}
              <Text style={{ fontFamily: "Gilroy_Bold", fontSize: 24 }}>
                {item.discountPrice
                  ? fixedPrice(item.discountPrice)
                  : fixedPrice(item.price["1"])}{" "}
                руб
              </Text>
            </View>
          </View>

          <View style={{ paddingBottom: 100 }}>
            <Text
              style={{
                fontFamily: "Gilroy_Bold",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Описание
            </Text>
            <Text
              style={{
                fontFamily: "Gilroy_Medium",
                fontSize: 13,
                color: "#7c7c7c",
              }}
            >
              {item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <AppButton
        pressHandler={() => {
          if (
            cartList.find((product) => product.product_id == item.product_id)
          ) {
            changeCartIncrement(item, count);
          } else {
            addCart(item, count);
          }
        }}
        title={"Добавить в корзину"}
        secondValue={
          item.discountPrice
            ? fixedPrice(item.discountPrice, count)
            : fixedPrice(item.price["1"], count)
        }
        style={{ position: "absolute", left: 30, right: 30, bottom: 30 }}
      />
    </View>
  );
};
