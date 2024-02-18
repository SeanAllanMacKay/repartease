"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useSpring, animated } from "@react-spring/web";

import { Button } from "@/components/Button";

import styles from "./Drawer.module.css";

export const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  direction = "right",
}) => {
  const ref = useRef(null);

  const fadeStyle = useSpring({ opacity: isOpen ? 1 : 0 });
  const slideStyle = useSpring(
    direction === "right"
      ? { width: isOpen ? 400 : 0 }
      : { height: isOpen ? ref.current.offsetHeight : 0 },
  );

  return createPortal(
    <animated.div
      className={`${styles.container} ${!isOpen ? styles.hidden : ""} ${
        styles[direction]
      }`}
      style={fadeStyle}
    >
      <div className={styles.shadow}></div>

      <animated.div
        className={styles.contentContainerShadow}
        style={slideStyle}
      >
        <div
          className={`${styles.contentContainer} ${styles[direction]}`}
          ref={ref}
        >
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>

            <div>
              <Button
                icon="close"
                variant="secondary"
                onClick={onClose}
                size="small"
              />
            </div>
          </div>

          <div className={styles.content}>{children}</div>
        </div>
      </animated.div>
    </animated.div>,
    document.body,
  );
};
