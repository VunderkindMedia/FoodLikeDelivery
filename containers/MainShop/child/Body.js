import React, { useContext } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppContext } from "../../../context/app/AppContext";
import { HorizontalListProducts } from "./HorizontalListProducts";

export const Body = ({ containerStyle, navigation }) => {
  const { products } = useContext(AppContext);
  return (
    <View style={containerStyle}>
      {products.filter((item) => item.discountPrice).length > 0 ? (
        <HorizontalListProducts
          navigation={navigation}
          items={products.filter((item) => item.discountPrice)}
          title={"Товары со скидкой"}
          refTitle={"Смотреть все"}
          refHandler={() =>
            navigation.push("Products", {
              filter: "discounted",
              title: "Товары со скидкой",
            })
          }
        />
      ) : null}
      {products.filter((item) => item.color === "orange").length > 0 ? (
        <HorizontalListProducts
          navigation={navigation}
          items={products.filter((item) => item.color === "orange")}
          title={"Рекомендуемые"}
          refTitle={"Смотреть все"}
          refHandler={() =>
            navigation.push("Products", {
              filter: "recommended",
              title: "Рекомендуемые товары",
            })
          }
        />
      ) : null}
    </View>
  );
};
