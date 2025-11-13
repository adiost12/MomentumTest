import { useState, useCallback, useMemo} from "react";
import { RootStackParamList } from "../../../../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { EMAIL_KEY } from "../../../constants/storageKeys";

export const useMailForm = () => {
     const [email, setEmail] = useState('')
      const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    
      const handleContinuePress = useCallback(async () => {
        await AsyncStorage.setItem(EMAIL_KEY, email);
        navigation.navigate('NameForm');
      }, [navigation, email ]);

      const isValidEmail = useMemo(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }, [email]);
      
      return {
        email,
        setEmail,
        handleContinuePress,
        isValidEmail
      }
}