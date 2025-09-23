import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { AppButton } from "@/components/AppButton";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.replace("/login");
  };

  return (
    <AppButton onPress={handleLogout} title={t("auth.logout.button")}/>
  );
};

export default LogoutButton;
