import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

interface SetNavigationOptionsProps {
  navigation: NavigationProp<RootStackParamList>;
  showBackButton?: boolean;
  title?: string | React.ReactNode;
}

export const setNavigationOptions = ({
  navigation,
  showBackButton = true,
  title,
}: SetNavigationOptionsProps) => {
  navigation.setOptions({
    headerTitle: () =>
      title || (
        <Image
          source={require('../../assets/momentumLogo.png')}
        />
      ),
    headerLeft: () =>
      showBackButton ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require('../../assets/backIcon.png')}
          />
        </TouchableOpacity>
      ) : null,
  });
};
