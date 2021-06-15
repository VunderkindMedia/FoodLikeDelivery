import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { colourNameToHex } from "../dist/colors";
export const main_color = "#53B175";

export const Styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  back_arrow: {
    marginLeft: 25,
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: main_color,
  },
  splash__logo: {
    width: 268,
    height: 207,
  },
  welcome__image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingVertical: 90,
  },
  welcome__content_wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  welcome__title: {
    fontFamily: "Gilroy_SemiBold",
    textAlign: "center",
    fontSize: 48,
    color: "#fff",
  },
  welcome__description: {
    color: "#FCFCFC",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    marginVertical: 15,
  },
  welcome__btn: {
    width: 350,
    height: 65,
    backgroundColor: main_color,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome__btn_title: {
    color: "#fff",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
  },
  welcome__mini_logo: {
    marginVertical: 35,
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  categories__item_image: {
    width: 102,
    height: 73,
    resizeMode: "contain",
  },
  categories__container: {
    flexBasis: Dimensions.get("window").width / 2 - 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    borderWidth: 1,
    borderRadius: 25,
  },
  categories__item_title: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    marginTop: 27,
    textAlign: "center",
    height: 40,
  },
  categories__flat_container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  products__flat_container: {
    width: "100%",
  },
  categories__skeleton_item: {
    flexBasis: Dimensions.get("window").width / 2 - 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E1E9EE",
    paddingVertical: 30,
    paddingHorizontal: 30,
    marginVertical: 7.5,
    marginHorizontal: 7.5,
  },
  categories__search_wrapper: {
    backgroundColor: "#f2f3f2",
    height: 52,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 12.5,
    marginTop: 30,
    marginHorizontal: 10,
  },
  categories__search_input: {
    flex: 1,
  },
  categories__search_icon: {
    marginRight: 10,
  },

  products__container: {
    flexBasis: Dimensions.get("window").width / 2 - 25,
    justifyContent: "center",
    marginHorizontal: 7.5,
    marginVertical: 7.5,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#e2e2e2",
  },
  products__item_title: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    marginTop: 27,
    height: 40,
  },
  products__item_description: {
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    marginVertical: 5,
    // height: 40,
    color: "#7c7c7c",
    // flex: 1,
  },
  products__item_price: {
    fontFamily: "Gilroy_Medium",
    fontWeight: "600",
    fontSize: 16,
  },
  products__item_old_price: {
    fontFamily: "Gilroy_Medium",
    fontWeight: "600",
    color: "#7c7c7c",
    fontSize: 14,
    textDecorationLine: "line-through",
  },
  products__item_bottom_wrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  products__item_plus_btn: {
    height: 45,
    width: 45,
    borderRadius: 15,
    backgroundColor: "#53B175",
    justifyContent: "center",
    alignItems: "center",
  },
  products__item_image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
    alignSelf: "center",
    zIndex: 10,
    marginTop: "20%",
  },
  cart__item: {
    flex: 1,
  },
  cart__item_wrapper: {
    flexDirection: "row",

    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  cart__item_image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 30,
  },
  cart_item_image_wrapper: {
    justifyContent: "center",
  },
  cart__item_center: {
    flex: 1,
  },
  cart__item_title: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    marginBottom: 5,
  },
  cart__item_description: {
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    color: "#7c7c7c",
    marginBottom: 12,
  },
  cart__item_btns_wrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
  },
  cart__item_btn: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 17,
  },
  cart__item_counter_wrapper: {
    width: 34,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  cart__item_counter: {
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  cart__item_min_btn_label: {
    fontSize: 21,
  },
  cart__item_devider: {
    flex: 1,
    borderBottomWidth: 1,
    marginHorizontal: 25,
    borderColor: "#e2e2e2",
  },
  cart__item_right_wrapper: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cart__item_price_wrapper: {
    justifyContent: "center",
    height: 45,
  },
  cart__item_price: {
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
  },
  cart__item_price_old: {
    fontFamily: "Gilroy_Bold",
    fontSize: 14,
    color: "#7c7c7c",
    textDecorationLine: "line-through",
  },
  discoundLabel: {
    backgroundColor: "#e62224",
    paddingHorizontal: 4,
    paddingRight: 15,
  },
  recomendLabel: {
    backgroundColor: "#e67022",
    paddingHorizontal: 4,
    paddingLeft: 15,
  },
  discoundLabelTitle: {
    fontFamily: "Gilroy_SemiBold",
    color: "#fff",
  },
  discountLabelWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: -1,
    zIndex: 100,
  },
  recomendLabelWrapper: {
    flexDirection: "row",
    position: "absolute",
    top: "10%",
    right: -1,
    zIndex: 11,
  },
  tryangleLabel: {
    width: 15,
    marginLeft: -10,
    backgroundColor: "#fff",
    transform: [
      {
        rotate: "45deg",
      },
    ],
    zIndex: 2,
  },
  tryangleLabelRecomend: {
    width: 15,
    marginRight: -10,
    backgroundColor: "#fff",
    transform: [
      {
        rotate: "45deg",
      },
    ],
    zIndex: 2,
  },
  cartWarningWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  cartWarningTitle: {
    fontFamily: "Gilroy_SemiBold",
    color: "red",
  },
});
