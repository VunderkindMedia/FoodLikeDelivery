import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  TextInput,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import React, {
  createRef,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../context/app/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { main_color } from "../assets/Styles";
import { AppButton } from "./AppButton";

export const ActionModal = forwardRef(
  ({ items, onChangeValue, text, checkedValue }, ref) => {
    const scrollViewRef = createRef();
    const { comment_value, setCommentValue, replaceValues } = useContext(
      AppContext
    );
    return (
      <ActionSheet
        initialOffsetFromBottom={1}
        ref={ref}
        statusBarTranslucent
        bounceOnOpen={true}
        bounciness={4}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}
      >
        {text ? (
          <View style={{ height: "70%", padding: 20 }}>
            <TextInput
              placeholder={"Введите комментарий"}
              onChangeText={setCommentValue}
              multiline
              maxLength={300}
              style={{
                borderWidth: 1,
                borderColor: "#e2e2e2",
                borderRadius: 20,
                padding: 10,
                height: 200,
                textAlignVertical: "top",
              }}
              value={comment_value}
            />
            <AppButton
              title={"Сохранить"}
              style={{ marginTop: 20 }}
              pressHandler={() => {
                ref.current?.hide();
              }}
            />
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            nestedScrollEnabled={true}
            onScrollEndDrag={() => ref.current?.handleChildScrollEnd()}
            onScrollAnimationEnd={() => ref.current?.handleChildScrollEnd()}
            onMomentumScrollEnd={() => ref.current?.handleChildScrollEnd()}
            style={styles.scrollview}
          >
            <View>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => {
                    onChangeValue(index);
                    ref.current?.hide();
                  }}
                  style={styles.listItem}
                >
                  <View
                    style={{
                      height: 15,
                      marginVertical: 15,
                      flex: 1,
                    }}
                  >
                    <Text style={styles.selectedItem}>{item}</Text>
                  </View>

                  {index === checkedValue && (
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color={main_color}
                    />
                  )}
                  {replaceValues[index] === checkedValue && (
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color={main_color}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </ActionSheet>
    );
  }
);

const styles = StyleSheet.create({
  footer: {
    height: 100,
  },
  selectedItem: {
    fontSize: 18,
    fontFamily: "Gilroy_SemiBold",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnLeft: {
    width: 30,
    height: 30,
    backgroundColor: "#f0f0f0",
    borderRadius: 100,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  scrollview: {
    width: "100%",
    padding: 15,
  },
  btn: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fe8a71",
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { width: 0.3 * 4, height: 0.5 * 4 },
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * 4,
  },
  safeareview: {
    justifyContent: "center",
    flex: 1,
  },
  btnTitle: {
    color: "white",
    fontWeight: "bold",
  },
});
