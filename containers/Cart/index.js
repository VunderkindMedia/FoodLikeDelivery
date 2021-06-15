import React, { useContext } from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Styles } from "../../assets/Styles";
import { AppContext } from "../../context/app/AppContext";
import { cartItemTemplate } from "./childs/cartItemTemplate";
import { AppButton } from "../../components/AppButton";
import { EmptyList } from "../../components/EmptyList";

export const Cart = ({ navigation }) => {
  const {
    cartList,
    removeCart,
    changeCartIncrement,
    changeCartDecrement,
    priceCart,
  } = useContext(AppContext);
  return (
    <View style={{ flex: 1 }}>
      {cartList.length === 0 && <EmptyList title={"Корзина пуста"} />}
      {cartList.length !== 0 && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartList}
            renderItem={({ item }) =>
              cartItemTemplate(
                item,
                removeCart,
                changeCartIncrement,
                changeCartDecrement,
                navigation
              )
            }
            keyExtractor={(item) => item.product_id}
          />
          <AppButton
            title={"Оформить заказ"}
            secondValue={priceCart()}
            disabled={500 - priceCart() > 0}
            pressHandler={() => navigation.navigate("OrderMain")}
            style={{ position: "absolute", left: 25, right: 25, bottom: 35 }}
          />
          {500 - priceCart() > 0 && (
            <View style={Styles.cartWarningWrapper}>
              <Text style={Styles.cartWarningTitle}>
                Для оформления заказа необходимо еще{" "}
                {(500 - priceCart()).toFixed(2)} ₽
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};
