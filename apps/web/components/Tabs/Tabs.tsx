import { useMemo, useState } from "react";

import { useTransition, animated, useSpring, easings } from "@react-spring/web";

import { Button } from "@/components/Button";

import styles from "./Tabs.module.css";

import { Tab } from "./Tab";
import type { TabsProps, TabProps } from "./types";

export const Tabs = ({ children }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const [direction, setDirection] = useState<string>("right");

  const tabs: React.ReactElement<TabProps>[] | null = useMemo(() => {
    if (Array.isArray(children)) {
      return children.filter((child) => child.type === Tab);
    }

    if (["string", "number", "boolean"].includes(typeof children)) {
      return null;
    }

    if (children?.type && children.type === Tab) {
      return children;
    }

    return null;
  }, [children]);

  const headers = useMemo(
    () =>
      tabs?.map((tab) => ({
        tabKey: tab.props.tabKey,
        label: tab.props.label,
        icon: tab.props.icon,
      })),
    [tabs],
  );

  const onChangeTab = (newTabIndex: number) => {
    setDirection(!activeTab || newTabIndex > activeTab ? "right" : "left");
    setActiveTab(newTabIndex);
  };

  const transitions = useTransition(activeTab, {
    exitBeforeEnter: false,
    keys: null,
    from: {
      opacity: 0,
      transform: `translate3d(${
        direction === "right" ? "100" : "-100"
      }px,0,0) scale(0.8)`,
    },
    enter: { opacity: 1, transform: "translate3d(0px,0,0) scale(1)" },
    leave: {
      opacity: 0,
      transform: `translate3d(${
        direction === "right" ? "-100" : "100"
      }px,0,0) scale(0.8)`,
      position: "absolute",
    },
    config: {
      duration: 250,
      easing: easings.easeOutCubic,
    },
  });

  return (
    <div style={{ width: "100%" }}>
      <div className={styles.tabBarContainer}>
        {headers?.map(({ tabKey, label, icon }, index) => (
          <Button
            key={tabKey}
            label={label}
            icon={icon}
            onClick={() => onChangeTab(index)}
            variant={index === activeTab ? "primary" : "secondary"}
            size="small"
          />
        ))}
      </div>

      {tabs?.length
        ? transitions((styles, item) => (
            <animated.div
              key={activeTab}
              style={styles}
              className={styles.tabContainer}
            >
              {tabs[item]}
            </animated.div>
          ))
        : null}
    </div>
  );
};

Tabs.Tab = Tab;
