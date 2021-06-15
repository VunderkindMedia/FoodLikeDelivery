import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export const ModalContainer = ({ navigation, topOffset = 60, children, title, horizontalOffset=0 }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    innerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      top: topOffset,
      backgroundColor: '#fff',
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      paddingVertical: 20,
      marginHorizontal: horizontalOffset,
      borderColor: '#e2e2e2',
      borderWidth: .5

    },
    modalHeader: {
      height: 60,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    modalTitle: {
      fontFamily: 'Gilroy_SemiBold',
      fontSize: 24,
      alignSelf: 'center'
    }
  });


  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity activityOpacity={.8} onPress={() => navigation.goBack()}><Ionicons name="close" size={28} color="black" /></TouchableOpacity>
          </View>
          {children}
        </View>
      </SafeAreaView>
  )
}
