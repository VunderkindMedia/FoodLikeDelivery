import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { main_color } from "../../assets/Styles";
import { AppContext } from "../../context/app/AppContext";
import { fixedPrice, status_string } from "../../helpers/funcs";
import moment from "moment-timezone";

export const Order = ({ navigation, route }) => {
  const { products, transaction, getTransaction, orderProducts } = useContext(
    AppContext
  );
  const [loading, setLoading] = useState(true);
  const order = route.params.order;

  useEffect(() => {
    let isMounted = true;
    navigation.setOptions({
      title: order.address,
    });
    getTransaction(order.transaction_id).then((results) => {
      if (isMounted) {
        setLoading(false);
      }
    });
    return () => (isMounted = false);
  }, []);

  return !loading &&
    orderProducts &&
    orderProducts.products &&
    orderProducts.products.length !== 0 ? (
    <View style={styles.container}>
      <Text style={styles.data_create}>
        <Text style={styles.created_title}>Создан: </Text>
        {moment(moment(order.created_at).utc(true).utcOffset("+0800")).format(
          "DD MM YYYY HH:mm"
        )}{" "}
        (Сах.)
      </Text>
      <View style={styles.bottomWrapper}>
        <Text
          style={[
            styles.status,
            { color: order.status !== 7 ? main_color : "red" },
          ]}
        >
          {order.status !== 7 ? status_string(order.text_status) : "Отменен"}
        </Text>
        <Text style={styles.status}>Чек № {order.id}</Text>
      </View>
      <View style={styles.productWrapper}>
        {orderProducts.products.map((item) => {
          return (
            item.fromArrayProduct && (
              <View key={item.product_id} style={styles.productsItemWrapper}>
                <Text style={styles.productTitle}>
                  {+item.num} x {item.fromArrayProduct.product_name}
                </Text>
                <Text style={styles.productPrice}>
                  {item.fromArrayProduct.discountPrice
                    ? fixedPrice(item.fromArrayProduct.discountPrice * item.num)
                    : fixedPrice(item.product_price)}
                  ₽
                </Text>
              </View>
            )
          );
        })}
      </View>
      <View style={styles.deliveryWrapper}>
        <Text style={styles.deliveryTitle}>Доставка</Text>
        <Text style={styles.deliverySum}>
          {Number(order.delivery_price / 100).toFixed(2)}₽
        </Text>
      </View>
      <View style={styles.resultSumWrapper}>
        <Text style={styles.resultSumTitle}>ИТОГО</Text>
        <Text style={styles.resultSum}>
          {console.log("ressum", orderProducts)}
          {fixedPrice(orderProducts.resultSum + +order.delivery_price)}₽
        </Text>
      </View>
    </View>
  ) : (
    <View style={styles.indicatorWrapper}>
      <ActivityIndicator size={100} color={main_color} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginVertical: 5,
  },
  address: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 25,
  },
  bottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    paddingBottom: 15,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  data_create: {
    fontFamily: "Gilroy_Regular",
    fontSize: 14,
    marginVertical: 10,
    color: "#c7c7c7",
  },
  status: {
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
  },
  productWrapper: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
  },
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productTitle: {
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#c7c7c7",
    flex: 1,
    paddingBottom: 5,
  },
  productPrice: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#c7c7c7",
  },
  productsItemWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  created_title: {
    fontFamily: "Gilroy_SemiBold",
    color: "#000",
    fontSize: 14,
  },
  deliveryTitle: {
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    color: "#c7c7c7",
  },
  deliverySum: {
    fontFamily: "Gilroy_Bold",
    fontSize: 14,
    color: "#c7c7c7",
  },
  deliveryWrapper: {
    paddingTop: 15,
    paddingBottom: 7,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  resultSumWrapper: {
    paddingBottom: 7,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  resultSumTitle: {
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    color: "#080808",
  },
  resultSum: {
    fontFamily: "Gilroy_Bold",
    fontSize: 18,
    color: "#080808",
  },
});
