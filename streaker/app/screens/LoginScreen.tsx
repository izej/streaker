import React from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { MottoLogo } from "@/components/MottoLogo";
import { Container } from "@/styles/AuthStyles";
import { AuthForm } from "@/components/AuthForm";
import { login } from "@/api/auth";
import { useTranslation } from "react-i18next";

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        Alert.alert(t("alert.title.error"), t("auth.form.alert"));
        return;
      }

      const res = await login(email, password);
      Alert.alert(t("alert.title.success"), t("auth.login.alert_success"));
      router.replace("/");
    } catch (err: any) {
      Alert.alert(t("alert.title.error"), err.response?.data?.message || t("auth.login.alert_error"));
    }
  };

  return (
    <ScreenWrapper>
      <Container>
        <MottoLogo />
        <AuthForm
          onSubmit={handleLogin}
          submitLabel={t("auth.login.submit")}
          linkLabel={t("auth.login.link_label")}
          onLinkPress={() => router.push("/register")}
        />
      </Container>
    </ScreenWrapper>
  );
}
