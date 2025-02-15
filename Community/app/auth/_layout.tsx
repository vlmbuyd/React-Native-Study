import { Link, Stack } from "expo-router";
import React from "react";
import Foundation from "@expo/vector-icons/Foundation";
import { colors } from "@/constants";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.BLACK,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "로그인",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/"} replace style={{ paddingRight: 15 }}>
              <Foundation name="home" size={28} color="black" />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
