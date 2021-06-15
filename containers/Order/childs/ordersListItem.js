import { Ionicons } from "@expo/vector-icons";
import moment from "moment-timezone";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { main_color } from "../../../assets/Styles";
import { status_string } from "../../../helpers/funcs";

export const ordersListItem = (item, navigation) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        item.transaction_id !== null &&
          navigation.push("Order", { order: item });
      }}
    >
      <View style={styles.headerWrapper}>
        <Text style={styles.address}>{item.address}</Text>
        {item.transaction_id !== null ? (
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        ) : (
          <Text style={styles.comment}>Заказ в обработке</Text>
        )}
      </View>
      <Text style={styles.data_create}>
        <Text style={{ fontFamily: "Gilroy_SemiBold", color: "#000" }}>
          Создан:{" "}
        </Text>
        {moment(moment(item.created_at).utc(true).utcOffset("+0800")).format(
          "DD MM YYYY HH:mm"
        )}{" "}
        (Сах.)
      </Text>
      <View style={styles.bottomWrapper}>
        <Text
          style={[
            styles.status,
            { color: item.status !== 7 ? main_color : "red" },
          ]}
        >
          {item.status !== 7 ? status_string(item.text_status) : "Отменен"}
        </Text>
        <Text>№ {item.id}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#e2e2e2",
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
  comment: {
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    color: "red",
    paddingTop: 10,
    paddingBottom: 25,
  },
});
