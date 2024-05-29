import React from "react";
import { View } from "react-native";
import { Layout } from "Components/Layout";
import { Form, useForm } from "Components/Form";
import { FormField } from "Components/FormField";
import { TextInput } from "Components/TextInput";
import { Text } from "Components/Text";
import { isEmailInvalid, isRequiredInvalid } from "@repartease/validators";
import { Button } from "Components/Button";
import { User } from "../Api/controllers";

const RequestDeleteAccountForm = () => {
  const form = useForm<{ email: string; reason?: string }>();

  const onRequestDeleteAccount = form.handleSubmit(async (values) => {
    await User.requestAccountDeletion(values);
  });

  return (
    <>
      {!form.formState.isSubmitted ? (
        <>
          <Form form={form}>
            <FormField
              name="email"
              label="Email"
              validate={{ isRequiredInvalid, isEmailInvalid }}
              component={TextInput}
              helper="What email address is the account associated to?"
            />

            <FormField
              name="reason"
              label="Why are you making us do this extra work?"
              component={TextInput}
              helper="You know you can delete your account from the app or website, right?"
              isMulti
            />
          </Form>

          <Button
            isFluid={false}
            label="Request Account Deletion"
            onPress={onRequestDeleteAccount}
            isDisabled={form?.formState?.isSubmitting}
          />
        </>
      ) : (
        <Text variant="title">
          Your request has been sent off! Your account should be deleted within
          a couple of days.
        </Text>
      )}
    </>
  );
};

export default function DeleteAccount() {
  return (
    <Layout>
      <Text variant="title">
        Submit your request to delete your account and we'll reach out to make
        sure you own the email address.
      </Text>

      <View style={{ height: 50 }} />

      <RequestDeleteAccountForm />
    </Layout>
  );
}
