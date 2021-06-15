import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Styles} from '../../assets/Styles';

export const HeaderButton = (props) => {


  return (
      <TouchableOpacity onPress={() => props.onPress()} style={[{...props.style },Styles.back_arrow]}>
        {props.children || <Ionicons name="chevron-back-outline" size={24} color="black" />}
      </TouchableOpacity>
  )
}
