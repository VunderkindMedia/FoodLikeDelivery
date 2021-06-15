import React, { useState, useEffect } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { Styles } from "../../../assets/Styles";
import { AppButton } from "../../../components/AppButton";
import { sklonenie } from "../../../helpers/funcs";
import { searchCategoryItem } from "./searchCategoryItem";

export const headerSearchList = (
  item,
  categories,
  navigation,
  filteredCategories,
  filteredProducts
) => {
  const [visibleCats, setVisibleCats] = useState(false);

  return (
    <FlatList
      style={Styles.categories__flat_container}
      data={
        visibleCats
          ? filteredCategories
          : filteredCategories.filter((item, index) => {
              if (index < 3) {
                return item;
              }
            })
      }
      renderItem={({ item }) =>
        searchCategoryItem(item, navigation, categories)
      }
      numColumns={1}
      ListHeaderComponent={
        filteredCategories.length > 0 && (
          <Text style={styles.header}>Категории</Text>
        )
      }
      ListFooterComponent={
        <View>
          {filteredCategories.length > 3 ? (
            <AppButton
              style={{
                height: 40,
                width: 300,
                borderRadius: 10,
                alignSelf: "center",
                marginVertical: 10,
              }}
              pressHandler={() => {
                !visibleCats ? setVisibleCats(true) : setVisibleCats(false);
              }}
              title={
                visibleCats
                  ? `Скрыть`
                  : `Еще ${
                      filteredCategories.length - 3
                    } ${sklonenie(filteredCategories.length - 3, [
                      "категория",
                      "категории",
                      "категорий",
                    ])}`
              }
            />
          ) : null}
          {filteredProducts.length > 0 && (
            <Text style={[styles.header, { marginTop: 10 }]}>Товары</Text>
          )}
        </View>
      }
      keyExtractor={(item) => item.category_name + item.menu_category_id}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "Gilroy_Regular",
    color: "#7c7c7c",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  emptyCategories: {
    fontFamily: "Gilroy_Regular",
    color: "#7c7c7c",
    fontSize: 14,
  },
});
