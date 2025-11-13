import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { BACKGROUND_COLOR } from '../constants/colors';

interface SetNavigationOptionsProps {
  navigation: NavigationProp<RootStackParamList>;
  showBackButton?: boolean;
  title?: string | React.ReactNode;
  gestureEnabled?: boolean;
}

export const setNavigationOptions = ({
  navigation,
  showBackButton = true,
  title,
  gestureEnabled = true,
}: SetNavigationOptionsProps) => {
  navigation.setOptions({
    gestureEnabled,
    headerBackVisible: false,
    headerShown: true,
    headerTitle: () =>
      title || (
        <Image
          source={require('../../assets/momentumLogo.png')}
        />
      ),
    headerLeft: () =>
      showBackButton ? (
        <TouchableOpacity
          style={{ width: 40 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../assets/backIcon.png')}
          />
        </TouchableOpacity>
      ) : null,
    headerBackground: () => <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR, borderBottomColor: '#D9D9D9', borderBottomWidth: 1}}/>
  });
};