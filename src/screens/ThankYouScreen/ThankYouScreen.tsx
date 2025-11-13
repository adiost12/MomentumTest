import React from "react";
import MomentumText from "../../components/shared/MomentumText";
import { THANK_YOU_MESSAGE } from "../../constants/strings";
import { StyleSheet, View } from "react-native";

export const ThankYouScreen = () => {
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
    },
   text: {
        fontSize: 26,
        fontWeight: '600',
        color: '#009F35'
   }  
});