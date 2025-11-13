import { useCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../../../../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateCouponCode } from "../../../utills";
import { Discount, Plan } from "../../../types";

const discount: Discount = {
    discountFunction: (price: number) => price * 0.5,
    name: "50% Intro Discount",
}

export const useChoosePlan = () => {
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [isDiscountAvailable, setIsDiscountAvailable] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchNameAndGenerateCoupon = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            console.log('Retrieved name from AsyncStorage:', name);
            if (!name) return null;
            setCouponCode(generateCouponCode(name || ''));
        } catch (error) {
            console.error('Error retrieving name from AsyncStorage:', error);
            return null;
        }};
        fetchNameAndGenerateCoupon();
    }, []);

    const plans: Plan[] = [
        {id: 1, name: "4 WEEK PLAN", price: 50.00, numberOfDays: 28, isMostPopular: true },
    ]

    //this is added in case we'll have plan selection feature
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    const handleTimerEnd = useCallback(() => {
        setIsDiscountAvailable(false);
    }, []);

    const handleGetPlanPress = useCallback(() => {
        navigation.navigate('Checkout', {plan: selectedPlan, couponCode: isDiscountAvailable ? couponCode || undefined : undefined, discount: isDiscountAvailable ? discount : undefined});
    }, [navigation, selectedPlan, isDiscountAvailable, couponCode]);

    return {
        couponCode,
        isDiscountAvailable,
        plans,
        handleTimerEnd,
        selectedPlan,
        setSelectedPlan,
        handleGetPlanPress,
        discount,
    }
}