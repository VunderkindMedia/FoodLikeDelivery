import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  INPUT_PLACEHOLDER_ENTRANCE,
  INPUT_PLACEHOLDER_APARTMENT,
  INPUT_PLACEHOLDER_FLOOR,
  INPUT_PLACEHOLDER_STREET,
  INPUT_TITLE_ENTRANCE,
  INPUT_TITLE_APARTMENT,
  INPUT_TITLE_FLOOR,
  INPUT_TITLE_STREET,
  CANCEL,
  DELETE,
  DELETE_QUESTION_TITLE,
  DELETE_QUESTION_MSG,
} from "../../../dist/strings";
import { main_color } from "../../../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { twoButtonAlert } from "../../../helpers/funcs";

export const AddressItem = ({
  item,
  index,
  pressHandler,
  checkedAddress,
  deleteAddress,
  editAddress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.itemContainer,
        { borderColor: checkedAddress == index ? main_color : "#c7c7c7" },
      ]}
      onPress={() => pressHandler(index)}
    >
      <View style={styles.headerWrapper}>
        <Text style={styles.streetName}>{item.name}</Text>
        <TouchableOpacity
          style={[
            styles.deleteBtn,
            { paddingVerical: 5, paddingHorizontal: 30 },
          ]}
          activeOpacity={0.5}
          onPress={() =>
            twoButtonAlert(
              "Редактировать?",
              "Вы хотите отредактировать адрес?",
              CANCEL,
              "ОК",
              () => editAddress(index)
            )
          }
        >
          <FontAwesome name="pencil" size={20} color={main_color} />
        </TouchableOpacity>
        {checkedAddress == index ? (
          <Ionicons name="md-checkmark" size={24} color={main_color} />
        ) : (
          <TouchableOpacity
            style={styles.deleteBtn}
            activeOpacity={0.8}
            onPress={() =>
              twoButtonAlert(
                DELETE_QUESTION_TITLE,
                DELETE_QUESTION_MSG,
                CANCEL,
                DELETE,
                () => deleteAddress(index)
              )
            }
          >
            <Ionicons name="close" size={24} color="#b3b3b3" />
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text style={styles.inputTitle}>{INPUT_TITLE_STREET}</Text>
        <TextInput
          editable={false}
          style={styles.streetInput}
          placeholder={INPUT_PLACEHOLDER_STREET}
          value={item.street}
        />
      </View>
      <View style={styles.propsWrapper}>
        <View style={styles.propWrapper}>
          <Text style={styles.inputTitle}>{INPUT_TITLE_APARTMENT}</Text>
          <TextInput
            editable={false}
            style={styles.propsInput}
            placeholder={INPUT_PLACEHOLDER_APARTMENT}
            value={item.apartment}
          />
        </View>
        <View style={styles.propWrapper}>
          <Text style={styles.inputTitle}>{INPUT_TITLE_ENTRANCE}</Text>
          <TextInput
            editable={false}
            style={styles.propsInput}
            placeholder={INPUT_PLACEHOLDER_ENTRANCE}
            value={item.entrance}
          />
        </View>
        <View style={styles.propWrapper}>
          <Text style={styles.inputTitle}>{INPUT_TITLE_FLOOR}</Text>
          <TextInput
            placeholderTextColor={"#e2e2e2"}
            editable={false}
            style={styles.propsInput}
            placeholder={INPUT_PLACEHOLDER_FLOOR}
            value={item.floor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7,
    borderWidth: 1,
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
    flex: 1,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    borderColor: "#c7c7c7",
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
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#000",
    borderColor: "#c7c7c7",
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
