import React, { useContext } from "react";
import { Redirect } from "expo-router";
import { Layout } from "Components/Layout";
import { Button } from "Components/Button";
import { Form, useForm } from "Components/Form";
import { FormField } from "Components/FormField";
import { TextInput } from "Components/TextInput";
import { Tabs, Tab } from "Components/Tabs";
import { View } from "react-native";

import { UserContext } from "Contexts/UserContext";

import {
  isRequiredInvalid,
  isEmailInvalid,
  isPasswordInvalid,
} from "@repartease/validators";

const LoginForm = () => {
  const { onLogin, isLoading } = useContext(UserContext);

  const form = useForm<{ email: string; password: string }>();

  const onLoginCallback = form.handleSubmit(async (values) => {
    await onLogin(values);
  });

  return (
    <>
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
        onPress={onLoginCallback}
        isDisabled={isLoading}
      />
    </>
  );
};

const SignUpForm = () => {
  const { onSignUp } = useContext(UserContext);

  const form = useForm<{ email: string; password: string }>();

  const onSignUpCallback = form.handleSubmit(async (values) => {
    await onSignUp(values);
  });

  return (
    <>
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

        <FormField
          name="verify-password"
          label="Verify Password"
          validate={{
            isRequiredInvalid,
            isPasswordInvalid,
            isPasswordMatch: (verify, { password }) => {
              if (password !== verify) {
                return "These passwords don't match";
              }
            },
          }}
          component={TextInput}
          variant="password"
        />
      </Form>

      <Button
        isFluid={false}
        label="Sign Up"
        onPress={onSignUpCallback}
        isDisabled={form.formState.isSubmitting}
      />
    </>
  );
};

export default function Login() {
  const { user } = useContext(UserContext);

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Layout>
      <View style={{ height: "100%", paddingVertical: 24 }}>
        <Tabs>
          <Tab id="log-in" label="Log In">
            <LoginForm />
          </Tab>
          <Tab id="sign-up" label="Sign Up">
            <SignUpForm />
          </Tab>
        </Tabs>
      </View>
    </Layout>
  );
}
