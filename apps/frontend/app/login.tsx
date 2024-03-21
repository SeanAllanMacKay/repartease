import React, { useContext } from "react";
import { Redirect } from "expo-router";
import { Layout } from "Components/Layout";
import { Button } from "Components/Button";
import { Form, useForm } from "Components/Form";
import { FormField } from "Components/FormField";
import { TextInput } from "Components/TextInput";
import { Text } from "Components/Text";

import { UserContext } from "Contexts/UserContext";

import {
  isRequiredInvalid,
  isEmailInvalid,
  isPasswordInvalid,
} from "@repartease/validators";

export default function Login() {
  const { user, onLogin, isLoading } = useContext(UserContext);

  const form = useForm<{ email: string; password: string }>();

  const onSubmit = form.handleSubmit(async (values) => {
    await onLogin(values);
  });

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Layout>
      <Form form={form}>
        <FormField
          name="email"
          label="Email"
          validate={{ isRequiredInvalid, isEmailInvalid }}
          component={TextInput}
        />

        <FormField
          name="password"
          label="Password"
          validate={{ isRequiredInvalid, isPasswordInvalid }}
          component={TextInput}
          variant="password"
        />
      </Form>

      <Button
        isFluid={false}
        label="Log In"
        onPress={onSubmit}
        isDisabled={isLoading}
      />

      <Text>If you don't have an account, this'll make one for you.</Text>
    </Layout>
  );
}
