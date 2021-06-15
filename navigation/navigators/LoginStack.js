import React from 'react';
import {LoginStep1, LoginStep2} from '../../containers/Login';
import {createStackNavigator} from '@react-navigation/stack';
import {forFade} from '../childs/Animations';

export const LoginStack = ({}) => {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator
          screenOptions={{
            cardStyle: {
              backgroundColor: '#fff'
            }
          }}
      >
        <Stack.Screen
            name={"LoginStep1"}
            component={ LoginStep1 }
            options={{
              headerShown: false,
              headerLeft: null,
              title:'',
              cardStyleInterpolator: forFade,
              headerStyle: {
                shadowRadius: 0,
                shadowOffset: {
                  height: 0,
                },
              },
            }}/>
        <Stack.Screen
            name={"LoginStep2"}
            component={ LoginStep2 }
            options={{
              title: '',
              headerShown: false,
              cardStyleInterpolator: forFade
            }}
        />
      </Stack.Navigator>
  );
}
