import React, { useLayoutEffect } from "react";
import { TextInput, View, StyleSheet, Image } from "react-native";
import MomentumText from "../../components/shared/MomentumText";
import MomentumButton from "../../components/shared/MomentumButton";
import { BACKGROUND_COLOR, BUTTON_TEXT_COLOR, TEXT_INPUT_PLACEHOLDER_COLOR } from "../../constants/colors";
import LockIcon from '../../../assets/lockIcon.svg';
import { APPLIED_PROMO_CODE_MESSAGE, CARDHOLDER_NAME_INPUT_PLACEHOLDER, CVV_INPUT_PLACEHOLDER, EXPIRY_DATE_INPUT_PLACEHOLDER, PAY_NOW_BUTTON_TEXT, TOTAL_TO_PAY_TEXT, CHECKOUT_SCREEN_HEADER } from "../../constants/strings";
import GreyCoupon from '../../../assets/greyCoupon.svg';
import { useCheckoutScreen } from "./hooks/useCheckoutScreen";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import { setNavigationOptions } from "../../utils/navigationUtils";

const SAVINGS_COLOR = '#EE5255';


export default function CheckoutScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const {plan, couponCode, discount, cardholderName, setCardholderName, expiryDate, setExpiryDate, cvv, setCvv, cardNumber, setCardNumber, discountedPrice, savings, handleBuyNow, originalPrice} = useCheckoutScreen();

    useLayoutEffect(() => {
        setNavigationOptions({ navigation, showBackButton: true, title: <MomentumText style={styles.header}>{CHECKOUT_SCREEN_HEADER}</MomentumText> });
    }, [navigation]);

    return (
        <View style={styles.container} >
            <View style={styles.summaryCard}>
                <View style={styles.summaryHeader}>
                    <MomentumText style={styles.planNameSummary}>{plan?.name}</MomentumText>
                    <MomentumText style={styles.priceSummary}>${originalPrice.toFixed(2)}</MomentumText>
                </View>
                {
                discount && (
                <View style={styles.discountRow}>
                    <MomentumText style={styles.discountLabel}>Your 50% intro discount</MomentumText>
                    <MomentumText style={styles.discountPrice}>-${discountedPrice.toFixed(2)}</MomentumText>
                </View>
                )
                }
                

                {couponCode && (
                    <View style={styles.couponRow}>
                        <GreyCoupon width={16} height={16} style={styles.couponIcon} />
                        <MomentumText style={styles.couponText}>{APPLIED_PROMO_CODE_MESSAGE} {couponCode}</MomentumText>
                    </View>
                )}

                <View style={styles.divider} />

                <View style={styles.totalRow}>
                    <MomentumText style={styles.totalLabel}>{TOTAL_TO_PAY_TEXT}</MomentumText>
                    <MomentumText style={styles.totalPrice}>${discountedPrice.toFixed(2)}</MomentumText>
                </View>
                {discount && (
                <View style={styles.savingsRow}>
                    <MomentumText style={styles.savingsIcon}>🔥</MomentumText>
                    <MomentumText style={styles.savingsText}>You just saved ${savings.toFixed(2)} (50% OFF)</MomentumText>
                </View>
                )}
                <View style={styles.paymentMethods}>
                    <Image source={require('../../../assets/cardLogos.png')} style={styles.cardIcon} />
                </View>

            <View style={styles.inputSection}>
                <TextInput 
                    style={styles.input}
                    placeholder="Credit Card"
                    placeholderTextColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                    keyboardType="numeric"
                    value={cardNumber}
                    onChangeText={setCardNumber}
                 />

                <View style={styles.rowInputs}>
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder={EXPIRY_DATE_INPUT_PLACEHOLDER}
                        keyboardType="numeric"
                        placeholderTextColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                    />
                    <TextInput
                        style={[styles.input, styles.halfInput]}
                        placeholder={CVV_INPUT_PLACEHOLDER}
                        placeholderTextColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                        secureTextEntry
                        keyboardType="numeric"
                        value={cvv}
                        onChangeText={setCvv}
                    />
                </View>
                <TextInput
                    style={styles.input}
                    placeholder={CARDHOLDER_NAME_INPUT_PLACEHOLDER}
                    placeholderTextColor={TEXT_INPUT_PLACEHOLDER_COLOR}
                    value={cardholderName}
                    onChangeText={setCardholderName}
                />
            </View>
            <MomentumButton 
                onPress={handleBuyNow}
                color="#009F35"
            >
                <LockIcon width={20} height={20} style={{ marginRight: 8 }} />
                <MomentumText style={styles.buttonText}>{PAY_NOW_BUTTON_TEXT}</MomentumText>
            </MomentumButton>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: BACKGROUND_COLOR,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    planNameSummary: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    priceSummary: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    discountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    discountLabel: {
        fontSize: 14,
    },
    discountPrice: {
        fontSize: 14,
        color: SAVINGS_COLOR,
        fontWeight: '500',
    },
    couponRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        paddingVertical: 8,
        backgroundColor: '#EFF1F5',
        borderRadius: 5,

    },
    couponIcon: {
        marginRight: 8,
    },
    couponIconText: {
        fontSize: 14,
    },
    couponText: {
        fontSize: 12,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    savingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        width: '100%',
    },
    savingsIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    savingsText: {
        fontSize: 12,
        color: SAVINGS_COLOR,
        fontWeight: '500',
        textAlign: 'right',
    },
    paymentSection: {
        marginBottom: 24,
    },
    paymentMethods: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 12,
        // paddingHorizontal: 8,
        marginBottom: 20,
        width: '100%',
    },
    cardIcon: {
        width: '100%',
        height: 40,
        resizeMode: 'contain',
    },
    inputSection: {
        marginBottom: 24,
    },
    creditCardInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    creditCardLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    creditCardIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        gap: 12,
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        fontSize: 14,
        color: '#000',
        marginBottom: 12,
    },
    halfInput: {
        flex: 1,
    },
    buttonText: {
        color: BUTTON_TEXT_COLOR,
        fontSize: 18,
        textAlign: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: '700',
    }
});