import React from "react";
import { View, StyleSheet } from "react-native";

import MomentumText from "../../../components/shared/MomentumText";
import { Discount, Plan } from "../../../types";
import { TEXT_INPUT_PLACEHOLDER_COLOR } from "../../../constants/colors";
import { MOST_POPULAR } from "../../../constants/strings";

export type PlanCardProps = {
    plan: Plan;
    discount?: Discount;
}

export default function PlanCard({ plan, discount }: PlanCardProps) {
    const discountedPrice = discount ? discount.discountFunction(plan.price) : plan.price;
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <View style={styles.leftContent}>
                        <View style={styles.bullet} />
                        <View>
                            <MomentumText style={styles.planName}>{plan.name}</MomentumText>
                            {plan.price && (
                                <View style={styles.priceRow}>
                                    {
                                        discount && (
                                            <MomentumText style={styles.originalPrice}>{plan.price.toFixed(2)} USD</MomentumText>
                                        )
                                    }
                                    <MomentumText style={styles.discountedPrice}>{discountedPrice.toFixed(2)} USD</MomentumText>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.rightContent}>
                        <View style={styles.dailyPrice}>
                            <MomentumText style={styles.price}>${(discountedPrice / plan.numberOfDays).toFixed(2)}</MomentumText>
                            <MomentumText style={styles.perDay}>USD</MomentumText>
                        </View>
                        <MomentumText style={styles.perDayLabel}>per day</MomentumText>
                    </View>
                </View>

            </View>
            {plan.isMostPopular && (
                <View style={styles.badge}>
                <MomentumText style={styles.badgeText}>{MOST_POPULAR}</MomentumText>
                </View>
            )}           
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#568EF7',
    },
    container: {
        width: '100%',
        padding: 16,
    
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    leftContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#000',
        marginRight: 12,
        marginTop: 6,
    },
    planName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 12,
        color: '#E63946',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    discountedPrice: {
        fontSize: 12,
        color: TEXT_INPUT_PLACEHOLDER_COLOR,
        fontWeight: '500',
    },
    rightContent: {
        alignItems: 'flex-start',
    },
    dailyPrice: {
        flexDirection: 'row',
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
    },
    perDay: {
        fontSize: 10,
        color: '#0F0F0F',
        marginTop: 2,
    },
    perDayLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#999999',
    },
    badge: {
        width: '100%',
        backgroundColor: '#568EF7',
        paddingVertical: 8,
        borderBottomEndRadius: 4,
        alignSelf: 'center',
    },
    badgeText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
});