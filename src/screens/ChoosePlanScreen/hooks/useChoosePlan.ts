import { useCallback, useEffect, useState } from "react";
import { RootStackParamList } from "../../../../App";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateCouponCode } from "../../../utills";
import { Discount, Plan } from "../../../types";
import { useDiscountStore } from "../../../store/discountStore";
import { IS_DISCOUNT_AVAILABLE_KEY } from "../../../constants/storageKeys";

const discount: Discount = {
    discountFunction: (price: number) => price * 0.5,
    name: "50% Intro Discount",
}

export const useChoosePlan = () => {
    const [couponCode, setCouponCode] = useState<string | null>(null);
    const [isDiscountAvailable, setIsDiscountAvailable] = useState(true);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { setDiscount, clearDiscount } = useDiscountStore();

    useEffect(() => {
        const fetchNameAndGenerateCoupon = async () => {
        try {
            const name = await AsyncStorage.getItem('name');
            if (!name) return null;
            setCouponCode(generateCouponCode(name || ''));
        } catch (error) {
            console.error('Error retrieving name from AsyncStorage:', error);
            return null;
        }};
        fetchNameAndGenerateCoupon();
    }, []);

    useEffect(() => {
        const fetchDiscountAvailability = async () => {
            try {
                const storedAvailability = await AsyncStorage.getItem(IS_DISCOUNT_AVAILABLE_KEY);
                if (storedAvailability !== null) {
                    setIsDiscountAvailable(storedAvailability === 'true');
                }
            } catch (error) {
                console.error('Error retrieving discount availability from AsyncStorage:', error);
            }
        };
        fetchDiscountAvailability();
    }, []);

    const plans: Plan[] = [
        {id: 1, name: "4 WEEK PLAN", price: 50.00, numberOfDays: 28, isMostPopular: true },
    ]

    //this is added in case we'll have plan selection feature
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);

    const handleTimerEnd = useCallback(() => {
        AsyncStorage.setItem(IS_DISCOUNT_AVAILABLE_KEY, 'false');
        setIsDiscountAvailable(false);
    }, []);

    const handleGetPlanPress = useCallback(() => {
        if (isDiscountAvailable) {
            setDiscount(discount);
        } else {
            clearDiscount();
        }
        navigation.navigate('Checkout', {plan: selectedPlan, couponCode: isDiscountAvailable ? couponCode || undefined : undefined});
    }, [navigation, selectedPlan, isDiscountAvailable, couponCode, setDiscount]);

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