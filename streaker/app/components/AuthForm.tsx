import React, { useState } from "react";
import { AppButton } from "@/components/AppButton";
import { BottomSection, Input, Link } from "@/styles/AuthStyles";

type Props = {
  onSubmit: (email: string, password: string) => void;
  submitLabel: string;
  linkLabel: string;
  onLinkPress: () => void;
};

export const AuthForm = ({ onSubmit, submitLabel, linkLabel, onLinkPress }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BottomSection>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title={submitLabel} onPress={() => onSubmit(email, password)} />
      <Link onPress={onLinkPress}>{linkLabel}</Link>
    </BottomSection>
  );
};
