import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import HabitDetailsScreen from "@/screens/HabitDetailsScreen";
import CustomHeader from "@/components/CustomHeader";
import { useHabitsStore } from "@/store/useHabitsStore";

export default function HabitDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habit = useHabitsStore((state) => state.getHabitById(id));

  if (!habit) return null;

  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
        <CustomHeader title={habit.name} onBack={() => router.back()} />
      <ScreenWrapper>
        <HabitDetailsScreen habit={habit} />
      </ScreenWrapper>
    </>
  );
}

