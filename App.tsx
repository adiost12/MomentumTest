import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  MailFormScreen from './src/screens/MailFormScreen/MailFormScreen';
import ChoosePlanScreen from './src/screens/ChoosePlanScreen/ChoosePlanScreen';
import NameFormScreen from './src/screens/NameFormScreen/NameFormScreen';
import CheckoutScreen from './src/screens/CheckoutScreen/CheckoutScreen';
import { Discount, Plan } from './src/types';

export type RootStackParamList = {
  MailForm: undefined;
  NameForm: undefined;
  ChoosePlan: undefined;
  Checkout: {plan: Plan, couponCode?: string, discount?: Discount};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MailForm" component={MailFormScreen} />
        <Stack.Screen name="NameForm" component={NameFormScreen} />
        <Stack.Screen name="ChoosePlan" component={ChoosePlanScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
