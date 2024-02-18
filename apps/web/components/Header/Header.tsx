"use client";

import { useContext, useState, useEffect } from "react";

import { UserContext } from "@/contexts/UserContext";

import { Button } from "@/components/Button";
import { Drawer } from "@/components/Drawer";
import {
  Form,
  FormField,
  isRequired,
  useForm,
  validateUsername,
} from "@/components/Form";
import { TextInput } from "@/components/TextInput";

import styles from "./Header.module.css";

export const Header = () => {
  const { user, logout, updateUser } = useContext(UserContext);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onOpenUserMenu = () => {
    setIsUserMenuOpen(true);
  };

  const onCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const onEditName = () => {
    setIsEditing(true);
  };

  const onStopEditing = () => {
    setIsEditing(false);
  };

  const onLogOut = () => {
    logout();
    onStopEditing();
    onCloseUserMenu();
  };

  const userForm = useForm({
    defaultValues: {
      username: user?.username,
    },
  });

  const onSaveName = userForm.handleSubmit(async ({ username }) => {
    await updateUser({ username });

    onStopEditing();
  });

  const onUndoName = () => {
    userForm.reset({ username: user?.username });

    onStopEditing();
  };

  useEffect(() => {
    if (user) {
      userForm.reset({
        username: user.username,
      });
    }
  }, [user]);

  return (
    <>
      <header className={styles.container}>
        <h1 className={styles.title}>Repartease</h1>

        {user ? (
          <div className={styles.actions}>
            <Button
              variant="secondary"
              icon="user"
              onClick={onOpenUserMenu}
              size="small"
            />
          </div>
        ) : null}
      </header>

      <Drawer
        isOpen={isUserMenuOpen}
        onClose={onCloseUserMenu}
        title="User Info"
      >
        <div className={styles.drawerContent}>
          <div>
            <p className={styles.label}>Username</p>
            <p className={styles.value}>{user?.username}</p>
          </div>

          <Button
            icon="delete"
            variant="secondary"
            label="Log out"
            onClick={onLogOut}
          />
        </div>
      </Drawer>
    </>
  );
};
