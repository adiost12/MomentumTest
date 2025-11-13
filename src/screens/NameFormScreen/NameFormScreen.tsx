import React, { useLayoutEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import MomentumButton from "../../components/shared/MomentumButton";
import FormTemplate from "../../components/shared/FormTemplate";
import { NAME_FORM_PLACEHOLDER, NAME_FORM_TITLE } from "../../constants/strings";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import useNameForm from "./hooks/useNameForm";
import MomentumText from "../../components/shared/MomentumText";

export default function NameFormScreen() {
    const { name, setName, handleContinuePress, isValidName } = useNameForm();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Image source={require('../../../assets/momentumLogo.png')} />, 
            headerLeft: () => <TouchableOpacity onPress={() => {
                navigation.goBack();
        }}><Image source={require('../../../assets/backIcon.png')}/></TouchableOpacity>});
    }, [navigation]);

    return (
        <View style={styles.container}>
            <FormTemplate title={NAME_FORM_TITLE} placeholder={NAME_FORM_PLACEHOLDER} value={name} onChangeText={(input) => setName(input)} autoCorrect={false} />
          <MomentumButton disabled={!isValidName} onPress={handleContinuePress}>
            <MomentumText style={styles.continueText}>Continue</MomentumText>
          </MomentumButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',  
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    continueText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
});
