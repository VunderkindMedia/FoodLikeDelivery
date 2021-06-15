import React from "react";
import { Animated, Keyboard } from "react-native";
import { addOpacity } from "../../helpers/funcs";

export const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
export const forSlideY = ({ current, layouts }) => {
  return {
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: "#0000001A",
      opacity: current.progress,
    },
  };
};

export const forSlideX = ({ current, layouts }) => {
  return {
    cardStyle: {
      opacity: current.progress,
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: "#0000001A",
      opacity: current.progress,
    },
  };
};
