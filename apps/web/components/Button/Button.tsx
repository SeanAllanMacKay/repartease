"use client";

import { useRef } from "react";

import { useButton } from "react-aria";

import { Icon } from "@/components/Icon";

import styles from "./Button.module.css";

import type { ButtonProps } from "./types";

export const Button = ({
  label,
  onClick,
  isDisabled,
  icon,
  variant = "primary",
  size = "large",
}: ButtonProps) => {
  const ref = useRef(null);
  const audioRef = useRef(null);

  const onClickCallback = () => {
    audioRef?.current?.play();

    if (onClick) {
      onClick();
    }
  };

  const { buttonProps } = useButton(
    { isDisabled, onPress: onClickCallback },
    ref,
  );

  return (
    <button
      {...buttonProps}
      className={`${styles.container} ${styles[variant]} ${styles[size]} ${
        isDisabled ? styles.disabled : ""
      }`}
    >
      {icon ? <Icon variant={icon} /> : null}

      {label}

      <audio src="/app/click.mp3" ref={audioRef} />
    </button>
  );
};
