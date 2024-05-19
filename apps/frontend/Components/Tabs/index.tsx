import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Tab, TabProps } from "./Tab";
import { TabBar, TabRouteType } from "./TabBar";
import { SceneMap, TabView } from "react-native-tab-view";

export type TabsProps = PropsWithChildren<{
  variant?: "tabs" | "content-switcher";
}>;

export type TabsNavigationStateType = { index: number; routes: TabRouteType[] };

const isChildTab = (child: React.ReactNode) => {
  if (child?.type?.name === Tab.name) {
    return true;
  }

  return false;
};

export const Tabs = ({ children }: TabsProps) => {
  const tabs = useMemo<React.ReactElement<TabProps>[]>(() => {
    if (Array.isArray(children)) {
      return children.filter(isChildTab);
    } else {
      console.log(children);
      if (isChildTab(children)) {
        return [children];
      }

      return [];
    }
  }, [children]);

  const routes = useMemo(
    () =>
      tabs.map((tab) => ({
        key: tab.props.id,
        title: tab.props.label,
      })),
    [tabs]
  );

  const renderScene = SceneMap<TabProps>(
    Object.fromEntries(tabs.map((tab) => [tab.props.id, () => tab]))
  );

  const onChangeTab = (newIndex: number) =>
    onChangeNavigationState({ index: newIndex });

  const navigationStateReducer = (
    prevState: TabsNavigationStateType,
    newState: Partial<TabsNavigationStateType>
  ) => {
    return { ...prevState, ...newState };
  };

  const [navigationState, onChangeNavigationState] = useReducer(
    navigationStateReducer,
    {
      index: 0,
      routes,
    }
  );

  useEffect(() => {
    onChangeNavigationState({ routes });
  }, [routes]);

  return (
    <TabView
      navigationState={navigationState}
      renderScene={renderScene}
      onIndexChange={onChangeTab}
      renderTabBar={(props) => <TabBar {...props} onChangeTab={onChangeTab} />}
    />
  );
};

export * from "./Tab";
export * from "./TabBar";
