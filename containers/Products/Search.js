import { Ionicons } from "@expo/vector-icons";
import React, {
  useContext,
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { Styles } from "../../assets/Styles";
import { AppContext } from "../../context/app/AppContext";
import { categoriesItemTemplate } from "./childs/categoriesItemTemplate";
import { headerSearchList } from "./childs/headerSearchList";
import { productsItemTemplate } from "./childs/productsItemTemplate";
import { searchCategoryItem } from "./childs/searchCategoryItem";
import { FontAwesome } from "@expo/vector-icons";

export const Search = ({ navigation }) => {
  const {
    categories,
    products,
    cartList,
    addCart,
    changeCartIncrement,
  } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchInput = useRef(null);

  useLayoutEffect(() => {
    setFilteredCategories(
      categories.filter((item) => {
        if (item.category_name.includes(searchValue)) {
          return item;
        }
      })
    );
    setFilteredProducts(
      products.filter((item) => {
        if (item.product_name.includes(searchValue)) {
          return item;
        }
      })
    );
  }, [searchValue]);

  useEffect(() => {
    searchInput.current.focus();
  });

  return (
    <View style={[Styles.safeAreaView, { paddingHorizontal: 10 }]}>
      <View style={Styles.categories__search_wrapper}>
        <Ionicons
          name="ios-search-outline"
          size={24}
          color="#181B19"
          style={Styles.categories__search_icon}
        />
        <TextInput
          style={Styles.categories__search_input}
          placeholder="Поиск..."
          value={searchValue}
          ref={searchInput}
          onChangeText={(val) => setSearchValue(val)}
          placeholderTextColor={"#7c7c7c"}
          onFocus={() => console.log("pressed")}
        />
      </View>
      {searchValue !== 0 &&
      filteredProducts.length === 0 &&
      filteredCategories.length === 0 ? (
        <View style={styles.emptySearchTextWrapper}>
          <FontAwesome
            name="frown-o"
            size={60}
            color="#c7c7c7"
            style={styles.iconEmpty}
          />
          <Text style={[styles.emptySearchText, { fontSize: 20 }]}>
            Ничего не найдено
          </Text>
        </View>
      ) : searchValue.length === 0 ? (
        <View style={styles.emptySearchTextWrapper}>
          <Text style={styles.emptySearchText}>Введите слово для поиска</Text>
        </View>
      ) : (
        <FlatList
          style={Styles.products__flat_container}
          data={filteredProducts}
          ListHeaderComponent={({ item }) =>
            headerSearchList(
              item,
              categories,
              navigation,
              filteredCategories,
              filteredProducts
            )
          }
          renderItem={({ item }) =>
            productsItemTemplate(
              item,
              null,
              navigation,
              cartList,
              addCart,
              changeCartIncrement
            )
          }
          numColumns={2}
          keyExtractor={(item) => item.product_name + item.product_id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptySearchTextWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptySearchText: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#7c7c7c",
  },
  iconEmpty: {
    marginBottom: 15,
  },
});
