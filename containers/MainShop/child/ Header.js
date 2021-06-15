import React from "react";
import { View, Text } from "react-native";
import { Location } from "./Location";
import { Logo } from "./Logo";

export const Header = ({ style }) => {
  return (
    <View style={style}>
      <Logo />
      <Location />
    </View>
  );
};
