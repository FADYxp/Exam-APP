"use client";

import React, { Suspense } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SubjectsResponse } from "@/lib/types/subjects";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/shared/loader";
import Loading from "@/app/loading";

export default function Dashboard() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["subjects"],
    // to fetch subjects with pagination, we will use the pageParam provided by useInfiniteQuery
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/subjects?page=${pageParam}`, { method: "GET" });
      const result: SubjectsResponse = await response.json();
      return result;
    },
    initialPageParam: 1,
// to determine the next page number based on the last page's metadata
    getNextPageParam: (lastPage) => {
      const metadata = lastPage.payload?.metadata;
      if (!metadata || metadata.page === metadata.totalPages) return undefined;
      return metadata.page + 1;
    },
  });

  // to calculate the total number of items across all pages for InfiniteScroll's dataLength
  const totalItems = data?.pages.reduce((acc, page) => acc + (page.payload?.data.length || 0), 0) || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={totalItems} 
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={
            isFetchingNextPage && (
              <p className="font-geist text-gray-600 text-center w-full py-7">
                Loading...
              </p>
            )
          }
          endMessage={
            !hasNextPage && (
              <p className="font-geist text-gray-600 text-center w-full py-7">
                End of list
              </p>
            )
          }
          refreshFunction={refetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            hasNextPage && (
              <p className="font-geist text-gray-600 text-center w-full py-7">
                Scroll to view more <br />
                <span className="rotate-90">{">"}</span>
              </p>
            )
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <Suspense fallback={<Loading />}>
              {data?.pages.flatMap((page) =>
                page.payload?.data.map((subject) => (
                  <Link
                    href={`/exams?diplomaId=${subject.id}&diplomaTitle=${subject.title}`} 
                    key={subject.id}
                    className="relative w-full h-80 rounded-lg overflow-hidden group shadow-lg"
                  >
                    <Image
                      src={subject.image} 
                      alt={subject.title} 
                      fill={true}
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <h2 className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl">
                      {subject.title}
                    </h2>
                  </Link>
                ))
              )}
            </Suspense>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}