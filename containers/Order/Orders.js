import React, { useContext, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { main_color } from "../../assets/Styles";
import { AppContext } from "../../context/app/AppContext";
import { ordersListItem } from "./childs/ordersListItem";

export const Orders = ({ navigation }) => {
  const { orders, getOrders } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrders().then(() => {
      setLoading(false);
    });
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.indicatorWrapper}>
          <ActivityIndicator size={100} color={main_color} />
        </View>
      ) : (
        <FlatList
          style={{
            flex: 1,
            width: "100%",
            paddingHorizontal: 10,
            paddingVertical: 5,
            marginBottom: 10,
          }}
          data={orders.reverse()}
          renderItem={({ item }) => ordersListItem(item, navigation)}
          keyExtractor={(item) => `${item.id}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
});
