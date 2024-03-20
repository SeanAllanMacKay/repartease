import {
  FlatList as RNFlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback } from "react";
import debounce from "lodash.debounce";

export type FlatListCardProps<T> = {
  item: T;
  onClick?: (info: T) => void;
};

export type FlatListProps<T> = {
  data: T[];
  total?: number;
  isLoading?: boolean;
  card: (props: FlatListCardProps<T>) => React.ReactElement;
  onFetchNextPage?: (refetch?: boolean) => void;
  resource?: string;
  action?: React.ReactElement;
  pageSize?: number;
};

export const FlatList = <T extends unknown>({
  data,
  isLoading,
  card: Card,
  onFetchNextPage,
  pageSize = 20,
}: FlatListProps<T>) => {
  const debouncedCallback = useCallback(
    debounce(({ distanceFromEnd }) => {
      if (distanceFromEnd < 0 || isLoading) return;

      onFetchNextPage?.();
    }, 500),
    [onFetchNextPage]
  );

  return (
    <View style={styles.container}>
      {data?.length ? (
        <RNFlatList
          data={data}
          refreshing={isLoading}
          renderItem={(props) => (
            <View
              key={props.item._id}
              style={{ marginTop: 12, marginBottom: 12 }}
            >
              <Card {...props} />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={isLoading ?? false}
              onRefresh={() => onFetchNextPage?.(true)}
              colors={["#00000000"]}
              style={{ backgroundColor: "#00000000" }}
            />
          }
          initialNumToRender={pageSize}
          onEndReachedThreshold={0.5}
          onEndReached={debouncedCallback}
          style={styles.flatList}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { maxHeight: "100%" },
  flatList: { minHeight: 100 },
});
