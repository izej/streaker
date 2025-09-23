import "react-native-get-random-values";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("tabs.home"),
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />

        <Tabs.Screen
          name="add-habit"
          options={{
            title: t("tabs.add_habit"),
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />

        <Tabs.Screen
          name="stats"
          options={{
            title: t("tabs.stats"),
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="bar-chart" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="heartbeat" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
