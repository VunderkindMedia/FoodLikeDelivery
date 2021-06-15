import React, { useContext, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { orderPropsItems } from "./childs/orderPropsItems";
import { ModalContainer } from "../../components/ModalContainer";
import { AppContext } from "../../context/app/AppContext";
import {
  CANCEL,
  CHECK_ADRESS,
  DELETE,
  DELETE_QUESTION_MSG,
  DELETE_QUESTION_TITLE,
  EMPTY_ADDRESSES_LIST,
} from "../../dist/strings";
import { AddressItem } from "./childs/addressItem";
import { AppButton } from "../../components/AppButton";
import Toast from "react-native-toast-message";
import { twoButtonAlert } from "../../helpers/funcs";

export const Addresses = ({ navigation }) => {
  const {
    addresses,
    setCheckedAddress,
    checked_address,
    deleteAddress,
  } = useContext(AppContext);
  const addHandler = (id) => {
    navigation.navigate("AddAdress", { id: id });
  };

  useEffect(() => {
    console.log("adressess", addresses);
  }, [addresses]);
  return (
    <ModalContainer
      topOffset={80}
      horizontalOffset={5}
      navigation={navigation}
      title={"Адрес доставки"}
    >
      <Text style={styles.subtitle}>{CHECK_ADRESS}</Text>
      {addresses.length > 0 ? (
        <FlatList
          data={addresses}
          renderItem={({ item, index }) => (
            <AddressItem
              item={item}
              index={index}
              pressHandler={(index) =>
                twoButtonAlert(
                  "Выбор",
                  "Выбрать данный адрес?",
                  CANCEL,
                  "Выбрать",
                  () =>
                    setCheckedAddress(index).then(() => {
                      navigation.goBack();
                    })
                )
              }
              editAddress={(id) => addHandler(id)}
              deleteAddress={(id) =>
                deleteAddress(id).then(() => {
                  Toast.show({
                    text1: `Адрес "${item.name}" удален`,
                    type: "success",
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 60,
                  });
                })
              }
              checkedAddress={checked_address}
            />
          )}
          keyExtractor={(item) => item.name + item.street + item.entrance}
        />
      ) : (
        <View style={styles.placeholderWrapper}>
          <Text style={styles.placeholderText}>{EMPTY_ADDRESSES_LIST}</Text>
        </View>
      )}
      <AppButton
        title={"Добавить новый адрес"}
        pressHandler={() => addHandler()}
        style={{ marginHorizontal: 15, marginBottom: 0 }}
      />
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#c7c7c7",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  placeholderWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
  },
});
