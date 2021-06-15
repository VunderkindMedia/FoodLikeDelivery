import React, { useEffect, useContext, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../../context/app/AppContext";
import { main_color, Styles } from "../../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { paginate } from "../../helpers/funcs";

import { productsItemTemplate } from "./childs/productsItemTemplate";

export const Products = ({ navigation, route }) => {
  const {
    getProducts,
    products,
    cartList,
    addCart,
    changeCartIncrement,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const handleRefresh = () => {
    setLoading(true);
    getProducts().then(() => {
      console.log("загружено");
      setPage(1);
      setLoading(false);
    });
  };
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, []);

  return (
    <View style={[Styles.safeAreaView, { paddingHorizontal: 10 }]}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={[main_color, main_color]}
            refreshing={loading}
            onRefresh={handleRefresh}
            progressViewOffset={0}
          />
        }
        onEndReachedThreshold={0.05}
        onEndReached={() => {
          console.log("reach");
          setPage((prev) => prev + 1);
        }}
        ListHeaderComponent={
          <View style={Styles.categories__search_wrapper}>
            <Ionicons
              name="ios-search-outline"
              size={24}
              color="#181B19"
              style={Styles.categories__search_icon}
            />
            <TouchableOpacity
              style={[
                Styles.categories__search_input,
                { justifyContent: "center" },
              ]}
              containerStyle={{ width: "100%", justifyContent: "center" }}
              activeOpacity={0.8}
              onPress={(val) => {
                navigation.push("Search");
              }}
            >
              <Text style={{ color: "#7c7c7c" }}>Поиск в доДома</Text>
            </TouchableOpacity>
          </View>
        }
        style={Styles.products__flat_container}
        data={paginate(
          products.filter((item) => {
            if (
              route.params.category_id &&
              item.menu_category_id == route.params.category_id
            ) {
              return item;
            } else if (
              route.params.filter &&
              route.params.filter === "recommended" &&
              item.color === "orange"
            ) {
              return item;
            } else if (
              route.params.filter &&
              route.params.filter === "discounted" &&
              item.discountPrice
            ) {
              return item;
            }
          }),
          10,
          page
        )}
        renderItem={({ item }) =>
          productsItemTemplate(
            item,
            loading,
            navigation,
            cartList,
            addCart,
            changeCartIncrement
          )
        }
        numColumns={2}
        keyExtractor={(item) => item.product_id + item.product_name}
      />
    </View>
  );
};
