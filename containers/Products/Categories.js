import React, { useLayoutEffect, useContext, useState, useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  StatusBar,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppContext } from "../../context/app/AppContext";
import { main_color, Styles } from "../../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { paginate } from "../../helpers/funcs";
import { categoriesItemTemplate } from "./childs/categoriesItemTemplate";
import { HeaderButton } from "../../navigation/childs/HeaderButton";

export const Categories = ({ navigation, route }) => {
  const { getCategories, categories, checkLastCategories } = useContext(
    AppContext
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleRefresh = () => {
    setLoading(true);
    getCategories().then(() => {
      console.log("загружено");
      setPage(1);
      setLoading(false);
    });
  };

  useLayoutEffect(() => {
    if (route.params && route.params.parent_id) {
      navigation.setOptions({
        headerLeft: (props) => <HeaderButton {...props} />,
        headerTitleStyle: {
          alignSelf: "flex-start",
        },
      });
    }
  }, []);

  return (
    <View style={Styles.safeAreaView}>
      <FlatList
        style={Styles.categories__flat_container}
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
                // navigation.push("ProductsStack", { screen: "Search" });
                navigation.push("Search").then();
              }}
            >
              <Text style={{ color: "#7c7c7c" }}>Поиск в доДома</Text>
            </TouchableOpacity>
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={[main_color, main_color]}
            refreshing={loading}
            onRefresh={handleRefresh}
            progressViewOffset={0}
          />
        }
        onEndReached={() => setPage((prev) => prev + 1)}
        onEndReachedThreshold={0.05}
        data={paginate(
          categories.filter(
            (cat) =>
              cat.parent_category ==
              (route.params ? route.params.parent_id : "0")
          ),
          10,
          page
        )}
        renderItem={({ item }) =>
          categoriesItemTemplate(item, navigation, categories)
        }
        numColumns={2}
        keyExtractor={(item) => item.category_name}
      />
    </View>
  );
};
