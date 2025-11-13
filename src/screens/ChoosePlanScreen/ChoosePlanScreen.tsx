import React, {useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, FlatList } from "react-native";
import MomentumText from "../../components/shared/MomentumText";
import { GET_PLAN_BUTTON_TEXT, WORKOUT_PLAN_TITLE } from "../../constants/strings";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import MomentumButton from "../../components/shared/MomentumButton";
import PlanCard from "./components/PlanCard";
import PromoCard from "./components/PromoCard";
import { useChoosePlan } from "./hooks/useChoosePlan";
import { Discount, Plan } from "../../types";

const discount: Discount = {
    discountFunction: (price: number) => price * 0.5,
    name: "50% Intro Discount",
}

export default function ChoosePlanScreen() {
    const { plans, couponCode, isDiscountAvailable, handleTimerEnd, handleGetPlanPress } = useChoosePlan();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => <View style={{flex: 1, backgroundColor: '#EFF1F5', borderBottomColor: '#D9D9D9', borderBottomWidth: 1}} />,
          headerTitle: () => <Image source={require('../../../assets/momentumLogo.png')} />, 
          headerLeft: () => <TouchableOpacity onPress={() => {
              navigation.goBack();
      }}><Image source={require('../../../assets/backIcon.png')}/></TouchableOpacity>});
      }, [navigation]);

    const renderPlanItem = useCallback(({item}: {item: Plan}) => (
        <PlanCard plan={item} discount={isDiscountAvailable ? discount : undefined} />
    ), [isDiscountAvailable]);


        
    return (
        <View style={styles.container}>
            <MomentumText style={styles.title}>{WORKOUT_PLAN_TITLE}</MomentumText>
            {isDiscountAvailable && <PromoCard couponCode={couponCode} onTimerEnd={handleTimerEnd} />}
            <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={(item) => item.name} />
            <MomentumButton onPress={handleGetPlanPress}>
                <MomentumText style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>{GET_PLAN_BUTTON_TEXT}</MomentumText>
            </MomentumButton>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        height: '100%',
        marginVertical: 20,
    },
    title: {
        fontSize: 26,
        paddingBottom: 20,
        textAlign: 'center',
    },
});
