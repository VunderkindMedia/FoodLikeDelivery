import React, { useEffect, useContext, useState } from "react";
import { View, TextInput, FlatList } from "react-native";
import { AppContext } from "../../context/app/AppContext";
import { Styles } from "../../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { favoritesItemTemplate } from "./childs/favoritesItemTemplate";
import { EmptyList } from "../../components/EmptyList";

export const Favorites = ({ navigation, route }) => {
  const { addFavorites, removeFavorites, favorites, products } = useContext(
    AppContext
  );
  const [loading, setLoading] = useState(true);

  return (
    <View style={Styles.safeAreaView}>
      {favorites.length === 0 && (
        <EmptyList title={"Список понравившихся товаров пуст!"} />
      )}
      {favorites.length !== 0 && (
        <FlatList
          style={Styles.categories__flat_container}
          scrollEnabled={!loading}
          data={favorites.map((id) =>
            products.find((product) => product.product_id === id)
          )}
          renderItem={({ item }) =>
            favoritesItemTemplate(item, removeFavorites, navigation)
          }
          keyExtractor={(item) => item.product_id}
        />
      )}
    </View>
  );
};
