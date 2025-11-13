import React, { useLayoutEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MomentumButton from '../../components/shared/MomentumButton';
import FormTemplate from '../../components/shared/FormTemplate';
import { EMAIL_FORM_ERROR, EMAIL_FORM_PLACEHOLDER, EMAIL_FORM_TITLE } from '../../constants/strings';
import { RootStackParamList } from '../../../App';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMailForm } from './hooks/useMailForm';
import MomentumText from '../../components/shared/MomentumText';
import RightArrow from '../../../assets/icon_right.svg';
import { setNavigationOptions } from '../../utils/navigationUtils';

export default function MailFormScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useLayoutEffect(() => {
    setNavigationOptions({ navigation, showBackButton: false });
  }, [navigation]);
  const { email, setEmail, handleContinuePress, isValidEmail } = useMailForm();

  return (
    <View style={styles.container}>
      <FormTemplate
        placeholder={EMAIL_FORM_PLACEHOLDER}
        title={EMAIL_FORM_TITLE}
        errorMessage={EMAIL_FORM_ERROR} 
        value={email}
        keyboardType='email-address'
        onChangeText={(input) => setEmail(input)}
      />
      <MomentumButton disabled={!isValidEmail} onPress={handleContinuePress}>
        <MomentumText style={styles.continueText}>Continue</MomentumText>
        <RightArrow width={24} height={24} />
      </MomentumButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  continueButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
