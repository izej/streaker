import React from "react";
import HabitsStatsCalendar from "@/components/HabitStatsCalendar";
import ScreenWrapper from "@/components/ScreenWrapper";
import HabitsSummaryTiles from "@/components/HabitsSummaryTiles";
import {ScrollView} from "react-native";

export default function HabitsStatsScreen() {
  return (
    <ScreenWrapper>
      <ScrollView>
        <HabitsStatsCalendar/>
        <HabitsSummaryTiles/>
      </ScrollView>
    </ScreenWrapper>
  );
}