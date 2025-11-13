import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '../../../../App';
import { useDiscountStore } from '../../../store/discountStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HAS_PURCHASED_KEY, PLAN_KEY, TIME_PURCHASED_KEY } from '../../../constants/storageKeys';


type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

export const useCheckoutScreen = () => {
        const navigation = useNavigation<NavigationProp<RootStackParamList>>();
        const route = useRoute<CheckoutScreenRouteProp>();
        const { plan, couponCode } = route.params || {};
        const discount = useDiscountStore((state) => state.discount);
    
        const [cardholderName, setCardholderName] = useState('');
        const [expiryDate, setExpiryDate] = useState('');
        const [cvv, setCvv] = useState('');
        const [cardNumber, setCardNumber] = useState('');
    
        const discountedPrice = discount ? discount.discountFunction(plan.price) : plan.price;
        const originalPrice = plan?.price || 0;
        const savings = originalPrice - discountedPrice;


        // we should add validation for payment details in real app
        const handleBuyNow = useCallback(() => {
            AsyncStorage.setItem(HAS_PURCHASED_KEY, 'true');
            AsyncStorage.setItem(PLAN_KEY, JSON.stringify(plan));
            AsyncStorage.setItem(TIME_PURCHASED_KEY, new Date().toISOString());
            navigation.navigate('ThankYou');
        }, [navigation, plan]);

        return {
            plan,
            couponCode,
            discount,
            cardholderName,
            setCardholderName,
            expiryDate,
            setExpiryDate,
            cvv,
            setCvv,
            cardNumber,
            setCardNumber,
            discountedPrice,
            savings,
            handleBuyNow,
            originalPrice,
        }
}