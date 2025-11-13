import React, { useLayoutEffect } from "react";
import MomentumText from "../../components/shared/MomentumText";
import { THANK_YOU_MESSAGE } from "../../constants/strings";
import { StyleSheet, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { setNavigationOptions } from "../../utils/navigationUtils";
import { BACKGROUND_COLOR } from "../../constants/colors";

export const ThankYouScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    useLayoutEffect(() => {
        setNavigationOptions({ navigation, showBackButton: false, gestureEnabled: false });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <MomentumText style={styles.text}>{THANK_YOU_MESSAGE}</MomentumText>
        </View>
    );
}

const styles = StyleSheet.create({
   container: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: BACKGROUND_COLOR,
    },
   text: {
        fontSize: 26,
        fontWeight: '600',
        color: '#009F35'
   }  
});