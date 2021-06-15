import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { main_color, Styles } from "../../../assets/Styles";
import { AppContext } from "../../../context/app/AppContext";
import { productsItemTemplate } from "../../Products/childs/productsItemTemplate";

export const HorizontalListProducts = ({
  items,
  navigation,
  title,
  refTitle,
  refHandler,
}) => {
  const { cartList, addCart, changeCartIncrement } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{title}</Text>
        {refTitle && (
          <TouchableOpacity onPress={refHandler} activeOpacity={0.6}>
            <Text style={styles.refTitle}>{refTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        horizontal={true}
        data={items}
        // contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) =>
          productsItemTemplate(
            item,
            null,
            navigation,
            cartList,
            addCart,
            changeCartIncrement,
            true
          )
        }
        keyExtractor={(item) => item.product_id + item.product_name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 24,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  container: {
    marginTop: 20,
  },
  refTitle: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: main_color,
    marginRight: 15,
  },
  titleWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
});
