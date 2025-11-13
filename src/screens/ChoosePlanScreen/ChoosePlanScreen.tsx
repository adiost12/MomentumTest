import React, {useCallback, useLayoutEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import MomentumText from "../../components/shared/MomentumText";
import { GET_PLAN_BUTTON_TEXT, WORKOUT_PLAN_TITLE } from "../../constants/strings";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";
import MomentumButton from "../../components/shared/MomentumButton";
import PlanCard from "./components/PlanCard";
import PromoCard from "./components/PromoCard";
import { useChoosePlan } from "./hooks/useChoosePlan";
import { Plan } from "../../types";
import { BUTTON_TEXT_COLOR } from "../../constants/colors";

export default function ChoosePlanScreen() {
    const { plans, couponCode, isDiscountAvailable, handleTimerEnd, handleGetPlanPress, discount } = useChoosePlan();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
      useLayoutEffect(() => {
        navigation.setOptions({
            headerBackground: () => <View style={{flex: 1, backgroundColor: '#EFF1F5', borderBottomColor: '#D9D9D9', borderBottomWidth: 1}} />,
          headerTitle: () => <Image source={require('../../../assets/momentumLogo.png')} />, 
          headerLeft: () => <TouchableOpacity onPress={() => {
              navigation.goBack();
      }}><Image source={require('../../../assets/backIcon.png')}/></TouchableOpacity>});
      }, [navigation]);

    // This is added in case we'll have plan selection feature

    const renderPlanItem = useCallback(({item}: {item: Plan}) => (
        <PlanCard plan={item} discount={isDiscountAvailable ? discount : undefined} />
    ), [isDiscountAvailable]);

        
    return (
        <View style={styles.container}>
            <MomentumText style={styles.title}>{WORKOUT_PLAN_TITLE}</MomentumText>
            {isDiscountAvailable && <PromoCard couponCode={couponCode} onTimerEnd={handleTimerEnd} />}
            <PlanCard plan={plans[0]} discount={isDiscountAvailable ? discount : undefined} />
            {/* <FlatList data={plans} renderItem={renderPlanItem} keyExtractor={(item) => item.name} /> */}
            <MomentumButton onPress={handleGetPlanPress}>
                <MomentumText style={styles.buttonText}>{GET_PLAN_BUTTON_TEXT}</MomentumText>
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
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: BUTTON_TEXT_COLOR,
    },
});
