import React from "react";
import { FlatList } from "components/FlatList";
import { GameCard } from "../Cards/GameCards";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Game } from "api";

export const RejoinGameTab = () => {
  const query = useInfiniteQuery({
    queryKey: ["games"],
    queryFn: async ({ pageParam = 1 }) => {
      const { games } = await Game.getList({ page: pageParam });

      return games || [];
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage?.length) {
        return;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
      firstPageParam - 1,
    staleTime: 60 * 1000 * 5,
    refetchOnMount: false,
  });

  const onFetchNextPage = (refetch) => {
    if (refetch) {
      query.refetch();
    } else {
      query.fetchNextPage();
    }
  };

  return (
    <FlatList
      data={query.data?.pages.flatMap((data) => data) ?? []}
      card={GameCard}
      onFetchNextPage={onFetchNextPage}
      isLoading={query.isFetching}
    />
  );
};
