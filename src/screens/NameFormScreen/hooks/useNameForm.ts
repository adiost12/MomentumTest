import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { RootStackParamList } from "../../../../App";
import { NAME_KEY } from "../../../constants/storageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useNameForm() {
    const [name, setName] = React.useState('');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();    

    const handleContinuePress = useCallback(async () => {
        await AsyncStorage.setItem(NAME_KEY, name);
        navigation.navigate('ChoosePlan');
    }, [navigation, name]);

    const isValidName = useMemo(() => {
        return name.trim().length > 2 && /^[a-zA-Z']+$/.test(name);
    }, [name]);

    return {
        name,
        setName,
        handleContinuePress, 
        isValidName
    }
}