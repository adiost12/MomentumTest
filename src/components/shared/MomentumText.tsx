import React from "react";
import { Text, StyleSheet } from "react-native";

export default function MomentumText({ children, style }: { children: React.ReactNode, style?: object }
) {
    return (
        <Text style={[styles.momentumText, style]}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    momentumText: {
        fontFamily: 'GothicA1-Regular',
        fontWeight: '600',
        textAlign: 'left',
    },
});