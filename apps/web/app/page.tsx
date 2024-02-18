"use client";
import { useContext, useEffect } from "react";
import { useNavigate } from "@/hooks";

import { Button } from "@/components/Button";
import {
  Form,
  FormField,
  useForm,
  isRequired,
  isPassword,
} from "@/components/Form";
import { TextInput } from "@/components/TextInput";

import { UserContext } from "@/contexts/UserContext";

import styles from "./page.module.css";

type FormValues = {
  username: string;
  password: string;
};

const Home = () => {
  const navigate = useNavigate();

  const { user, login } = useContext(UserContext);

  const { handleSubmit, formState, ...restForm } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (values: FormValues) => {
    await login(values);
  });

  useEffect(() => {
    if (user) {
      navigate({ pathname: "/games", isReplace: true });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Form<FormValues> form={{ ...restForm, handleSubmit, formState }}>
          <FormField
            name="email"
            label="Email"
            component={TextInput}
            validate={{ isRequired }}
          />

          <FormField
            name="password"
            label="Password"
            component={TextInput}
            validate={{
              isRequired,
              isPassword,
            }}
            type="password"
          />
        </Form>
      </div>

      <div className={styles.actionContainer}>
        <Button label="Log In" onClick={onSubmit} />

        <p className={styles.helper}>
          If you don't have an account, this'll make one
        </p>
      </div>
    </div>
  );
};

export default Home;
