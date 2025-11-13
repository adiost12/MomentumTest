import React from "react";  
import {TouchableOpacity, StyleSheet, View} from "react-native";

export default function MomentumButton({ onPress, disabled, children, color }: { onPress: () => void; disabled?: boolean; children: React.ReactNode; color?: string }) {
    return (
        <View style={[styles.buttonContainer, disabled ? { opacity: 0.5 } : { opacity: 1 }, color ? { backgroundColor: color } : {}]}>
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={styles.children}>
            {children}
        </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '90%',
        height: 54,
        backgroundColor: '#0F0F0F',
        borderRadius: 26,
        justifyContent: 'center',
        opacity: 0.5,
        alignSelf: 'center',
    },
    children: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
});