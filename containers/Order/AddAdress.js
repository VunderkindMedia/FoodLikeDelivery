import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { ModalContainer } from "../../components/ModalContainer";
import { main_color } from "../../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { twoButtonAlert } from "../../helpers/funcs";
import {
  INPUT_PLACEHOLDER_APARTMENT,
  INPUT_PLACEHOLDER_ENTRANCE,
  INPUT_PLACEHOLDER_FLOOR,
  INPUT_PLACEHOLDER_NAME,
  INPUT_PLACEHOLDER_STREET,
  INPUT_TITLE_APARTMENT,
  INPUT_TITLE_ENTRANCE,
  INPUT_TITLE_FLOOR,
  INPUT_TITLE_NAME,
  INPUT_TITLE_STREET,
} from "../../dist/strings";
import { AppButton } from "../../components/AppButton";
import { AppContext } from "../../context/app/AppContext";
import Toast from "react-native-toast-message";

export const AddAdress = ({ item, navigation, route }) => {
  const { addAddress, addresses, editAddress } = useContext(AppContext);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const watchApartment = watch("apartment", false);
  const watchFloor = watch("floor", false);
  const saveHandler = (data) => {
    if (route.params.id !== undefined) {
      editAddress(
        {
          name: data.name,
          street: data.street,
          apartment: data.apartment,
          entrance: data.entrance,
          floor: data.floor,
        },
        route.params.id
      ).then(() => {
        Toast.show({
          text1: `Адрес "${data.name}" изменен`,
          type: "success",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 60,
        });
        navigation.goBack();
      });
    } else {
      addAddress({
        name: data.name,
        street: data.street,
        apartment: data.apartment,
        entrance: data.entrance,
        floor: data.floor,
      }).then(() => {
        Toast.show({
          text1: `Адрес "${data.name}" добавлен`,
          type: "success",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 60,
        });
        navigation.goBack();
      });
    }
  };

  return (
    <ModalContainer
      topOffset={80}
      horizontalOffset={5}
      navigation={navigation}
      title={"Добавление адреса доставки"}
    >
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.inputTitle}>{INPUT_TITLE_NAME}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={(val) => onChange(val)}
                style={[
                  styles.streetInput,
                  { borderColor: errors.name ? "red" : "#c7c7c7" },
                ]}
                placeholder={INPUT_PLACEHOLDER_NAME}
                value={value}
                onBlur={onBlur}
              />
            )}
            rules={{ required: true }}
            name="name"
            defaultValue={
              route.params.id !== undefined
                ? addresses[route.params.id].name
                : ""
            }
          />
        </View>
        <View>
          <Text style={styles.inputTitle}>{INPUT_TITLE_STREET}</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={(val) => onChange(val)}
                style={[
                  styles.streetInput,
                  { borderColor: errors.street ? "red" : "#c7c7c7" },
                ]}
                placeholder={INPUT_PLACEHOLDER_STREET}
                value={value}
                onBlur={onBlur}
              />
            )}
            rules={{ required: true }}
            name="street"
            defaultValue={
              route.params.id !== undefined
                ? addresses[route.params.id].street
                : ""
            }
          />
        </View>
        <View style={styles.propsWrapper}>
          <View style={styles.propWrapper}>
            <Text style={styles.inputTitle}>{INPUT_TITLE_APARTMENT}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={(val) => onChange(val)}
                  style={[
                    styles.propsInput,
                    { borderColor: errors.apartment ? "red" : "#c7c7c7" },
                  ]}
                  placeholder={INPUT_PLACEHOLDER_APARTMENT}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              rules={{ required: watchFloor }}
              name="apartment"
              defaultValue={
                route.params.id !== undefined
                  ? addresses[route.params.id].apartment
                  : ""
              }
            />
          </View>
          <View style={styles.propWrapper}>
            <Text style={styles.inputTitle}>{INPUT_TITLE_ENTRANCE}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={(val) => onChange(val)}
                  onBlur={onBlur}
                  value={value}
                  style={[
                    styles.propsInput,
                    { borderColor: errors.entrance ? "red" : "#c7c7c7" },
                  ]}
                  placeholder={INPUT_PLACEHOLDER_ENTRANCE}
                />
              )}
              rules={{ required: true }}
              name="entrance"
              defaultValue={
                route.params.id !== undefined
                  ? addresses[route.params.id].entrance
                  : ""
              }
            />
          </View>
          <View style={styles.propWrapper}>
            <Text style={styles.inputTitle}>{INPUT_TITLE_FLOOR}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={(val) => onChange(val)}
                  placeholderTextColor={"#e2e2e2"}
                  style={[
                    styles.propsInput,
                    { borderColor: errors.floor ? "red" : "#c7c7c7" },
                  ]}
                  placeholder={INPUT_PLACEHOLDER_FLOOR}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              rules={{ required: watchApartment }}
              name="floor"
              defaultValue={
                route.params.id !== undefined
                  ? addresses[route.params.id].floor
                  : ""
              }
            />
          </View>
        </View>
      </View>
      <AppButton
        title={"Сохранить"}
        pressHandler={handleSubmit(saveHandler)}
        style={{ position: "absolute", left: 15, right: 15, bottom: 25 }}
      />
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginVertical: 7,
    borderRadius: 20,
    padding: 15,
  },
  streetName: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  inputTitle: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#c7c7c7",
    marginBottom: 7,
  },
  streetInput: {
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  propsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  propWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  propsInput: {
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteBtn: {
    padding: 5,
  },
});
