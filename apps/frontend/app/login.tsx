import React, { useContext } from "react";
import { Redirect } from "expo-router";
import { Layout } from "components/Layout";
import { Button } from "components/Button";
import { Form, useForm } from "components/Form";
import { FormField } from "components/FormField";
import { TextInput } from "components/TextInput";
import { Text } from "components/Text";

import { UserContext } from "contexts/UserContext";

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
