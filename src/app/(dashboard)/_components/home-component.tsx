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
  // Query to fetch subjects with infinite scrolling
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["subjects"],

    queryFn: async () => {
      const response = await fetch("/api/subjects", { method: "GET" });
      const data: Promise<SubjectsResponse> = await response.json();
      return data;
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage === lastPage.metadata.numberOfPages)
        return undefined;
      return lastPage.metadata.currentPage + 1;
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={2} //This is important field to render the next data
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
          // below props only if you need pull down functionality
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
          <div className="grid grid-cols-3 gap-2">
            <Suspense fallback={<Loading />}>
              {data?.pages.flatMap((page) =>
                page.subjects?.map((subject) => (
                  <Link
                    href={"/exams"}
                    key={subject._id}
                    className=" relative w-full h-448 "
                  >
                    <Image
                      src={subject.icon}
                      alt={subject.name}
                      fill={true}
                      className=" object-cover "
                    />
                    <h2 className="absolute bottom-2 left-2 right-2 backdrop-blur-sm bg-blue-600/50 px-4 py-5  text-white font-semibold">
                      {subject.name}
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
