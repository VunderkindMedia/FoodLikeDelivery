import React, { Component } from "react";
import { View, TouchableOpacity, Animated, Text } from "react-native";

class ToggleButton extends Component {
  static defaultProps = {
    disabled: false,
    buttonOnColor: "#fff",
    buttonOffColor: "#fff",
    sliderOnColor: "#446EBE",
    sliderOffColor: "#1e9278",
    buttonOnColorDisabled: "#666",
    buttonOffColorDisabled: "#666",
    sliderOnColorDisabled: "#444",
    sliderOffColorDisabled: "#444",
    buttonRadius: 0,
    sliderRadius: 0,
    changeToggleStateOnLongPress: true,
  };

  constructor(props) {
    super(props);
    this.dimensions = this.calculateDimensions(this.props);
    const { value } = this.props;

    this.state = {
      leftColor: value ? "#030303" : "#030303",
      rightColor: value ? "#030303" : "#030303",
    };

    let toValue = 0;
    if (value) {
      toValue = this.dimensions.buttonWidth - this.dimensions.translateX;
    }

    this.offsetX = new Animated.Value(toValue);
  }

  componentDidUpdate(prevProps) {
    const { props: currentProps } = this;

    if (prevProps !== currentProps) {
      this.dimensions = this.calculateDimensions(currentProps);

      let toValue = 0;

      if (currentProps.value) {
        toValue = this.dimensions.buttonWidth - this.dimensions.translateX;
      }

      Animated.timing(this.offsetX, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        this.setState({
          leftColor: currentProps.value ? "#030303" : "#030303",
          rightColor: currentProps.value ? "#030303" : "#030303",
        });
      });
    }
  }

  calculateDimensions = (toggleProps) => {
    let sliderWidth = 0;
    let sliderHeight = 0;
    let sliderRadius = 0;
    let margin = 0;
    if (!toggleProps.sliderWidth && !toggleProps.sliderHeight) {
      sliderHeight = 0.9 * toggleProps.buttonHeight;
      sliderWidth = sliderHeight;
    } else if (!toggleProps.sliderHeight) {
      sliderWidth = toggleProps.sliderWidth;
      sliderHeight = 0.9 * toggleProps.buttonHeight;
    } else {
      sliderWidth = toggleProps.sliderWidth;
      sliderHeight = toggleProps.sliderHeight;
    }
    if (toggleProps.buttonRadius && !toggleProps.sliderRadius) {
      sliderRadius = toggleProps.buttonRadius;
    } else {
      sliderRadius = toggleProps.sliderRadius;
    }
    if (!toggleProps.margin) {
      margin = parseInt(0.03 * toggleProps.buttonWidth, 10);
    }
    const dimensions = {
      buttonWidth: toggleProps.buttonWidth,
      buttonHeight: toggleProps.buttonHeight,
      buttonRadius: parseInt(
        (toggleProps.buttonRadius / 100) * toggleProps.buttonWidth,
        10
      ),
      sliderWidth,
      sliderHeight,
      sliderRadius: parseInt((sliderRadius / 100) * sliderWidth, 10),
      margin,
      translateX: 2 * parseInt(margin, 10) + sliderWidth,
    };
    return dimensions;
  };

  // eslint-disable-next-line react/destructuring-assignment
  toggleCommon = () => !this.props.value;

  onTogglePress = () => {
    const newState = this.toggleCommon();
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onToggle(newState);
  };

  onToggleLongPress = () => {
    const {
      value,
      changeToggleStateOnLongPress,
      onToggleLongPress,
    } = this.props;

    let newState = value;
    if (changeToggleStateOnLongPress) {
      newState = this.toggleCommon();
    }
    if (onToggleLongPress) {
      onToggleLongPress(newState);
    }
  };

  setBackgroundColor = (componentName) => {
    const { value, disabled } = this.props;
    const valueClass = value ? "On" : "Off";
    const disabledClass = disabled ? "Disabled" : "";

    const key = `${componentName}${valueClass}Color${disabledClass}`;
    const { [key]: data } = this.props;
    return data;
  };

  render() {
    const { disabled, leftText, rightText } = this.props;
    const { leftColor, rightColor } = this.state;

    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          disabled={disabled}
          style={{
            justifyContent: "center",
            borderRadius: this.dimensions.buttonRadius,
            borderWidth: 0,
            borderColor: "#293133",
            height: this.dimensions.buttonHeight,
            width: this.dimensions.buttonWidth,
            backgroundColor: this.setBackgroundColor("button"),
          }}
          activeOpacity={1}
          onPress={this.onTogglePress}
          onLongPress={this.onToggleLongPress}
        >
          <Text
            style={{
              position: "absolute",
              left: this.dimensions.sliderWidth / 3,
              color: leftColor,
            }}
          >
            {leftText}
          </Text>
          <Animated.View
            style={{
              margin: this.dimensions.margin,
              transform: [{ translateX: this.offsetX }],
              position: "absolute",
              width: this.dimensions.sliderWidth,
              height: this.dimensions.sliderHeight,
              borderRadius: this.dimensions.sliderRadius,
              backgroundColor: this.setBackgroundColor("slider"),
              zIndex: -1,
            }}
          />
          <Text
            style={{
              position: "absolute",
              right: this.dimensions.sliderWidth / 3,
              color: rightColor,
            }}
          >
            {rightText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ToggleButton;

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
};
