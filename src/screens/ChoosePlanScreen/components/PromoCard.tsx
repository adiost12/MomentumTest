import React from "react";
import { View, StyleSheet } from "react-native";
import MomentumText from "../../../components/shared/MomentumText";
import { PROMO_CODE_APPLIED } from "../../../constants/strings";
import { BACKGROUND_COLOR } from "../../../constants/colors";
import { usePromoCard } from "../hooks/usePrormoCard";
import CheckMark from '../../../../assets/checkMark.svg';
import GreenCoupon from '../../../../assets/greenCoupon.svg';

export type PromoCardProps = {
    couponCode: string | null;
    onTimerEnd: () => void;
}

export default function PromoCard({ couponCode, onTimerEnd }: PromoCardProps) {
    const { minutes, seconds } = usePromoCard(onTimerEnd);
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <GreenCoupon width={24} height={24} />
                <MomentumText style={styles.title}>{PROMO_CODE_APPLIED}</MomentumText>
            </View>
            <View style={styles.deviderContainer}>
                <View style={styles.halfCircleLeft} />
                <View style={styles.dottedDivider} />
                <View style={styles.halfCircleRight} />
            </View>
            <View style={styles.couponContainer}>
                <View style={styles.couponCodeContainer}>
                    <CheckMark width={16} height={16} />
                    <MomentumText style={styles.couponCode}>{couponCode}</MomentumText>
                </View>
                <View style={styles.timerContainer}>
                    <MomentumText style={styles.timerText}>
                        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
                    </MomentumText>
                    <MomentumText style={styles.timerLabel}>minutes seconds</MomentumText>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: 'rgba(117, 168, 152, 0.3)',
        paddingTop: 16,
        marginBottom: 16,
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 12,
        flexDirection: 'row',
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 0.5,
        color: '#333333',
    },
    dottedDivider: {
        width: '93%',
        height: 1,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'rgba(117, 168, 152, 0.5)',
        marginVertical: 12,
    },
    halfCircleLeft: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: BACKGROUND_COLOR,

    },
    halfCircleRight: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: BACKGROUND_COLOR,
    },
    couponContainer: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    couponCode: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1B4D3E',
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CEEAE2',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginLeft: 16,
    },
    timerText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#00C974',
        letterSpacing: 1,
    },
    timerLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: '#1B4D3E',
        marginTop: 4,
    },
    couponCodeContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'flex-start',
        height: 50,
        gap: 8,
    },
    deviderContainer: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});