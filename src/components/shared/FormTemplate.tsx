import React, { useEffect } from "react";

import { View, TextInput, StyleSheet } from "react-native";
import MomentumText from "./MomentumText";

export type FormTemplateProps = {
    title: string;
    value: string;
    placeholder: string;
    errorMessage?: string;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    autoCorrect?: boolean;
    validationFunction?: (input: string) => boolean;
    onChangeText: (input: string) => void;
};

export default function FormTemplate({ title, placeholder, errorMessage, keyboardType = 'default', autoCapitalize = 'sentences', autoCorrect = true, validationFunction, onChangeText, value }: FormTemplateProps) {
    const [isValid, setIsValid] = React.useState<boolean | null>(true);
    useEffect(() => {
        if (validationFunction) {
            if(validationFunction(value)) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        }}, [value]);
    
    return (
        <View style={styles.container}>
            <MomentumText style={styles.title}>{title}</MomentumText>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                value={value}
                onChangeText={(text) => {
                    onChangeText(text);
                }}
            />
            {!isValid && <MomentumText style={{ color: 'red' }}>{errorMessage}</MomentumText>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        fontSize: 26,
        paddingBottom: 40,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 8,
        fontSize: 26,
        textAlign: 'center',
        paddingBottom: 12,
    },
});