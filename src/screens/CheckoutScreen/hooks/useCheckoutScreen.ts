import { RouteProp, useRoute } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { RootStackParamList } from '../../../../App';


type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;

export const useCheckoutScreen = () => {
        const route = useRoute<CheckoutScreenRouteProp>();
        const { plan, couponCode, discount } = route.params || {};
    
        const [cardholderName, setCardholderName] = useState('');
        const [expiryDate, setExpiryDate] = useState('');
        const [cvv, setCvv] = useState('');
        const [cardNumber, setCardNumber] = useState('');
    
        const discountedPrice = discount ? discount.discountFunction(plan.price) : plan.price;
        const originalPrice = plan?.price || 0;
        const savings = originalPrice - discountedPrice;
    
        const handleBuyNow = useCallback(() => {
            // Handle payment processing
            console.log('Processing payment...');
        }, []);
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