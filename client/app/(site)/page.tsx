'use client'
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { HomePageState, RequestStatus, setError, setHomePageData, setLoading } from "@/lib/features/homePage/homePageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import HorizontalSongsList from "@/components/song/HorizontalSongsList";
import { RootState } from "@/lib/store";
import { getHomePageData } from "@/lib/features/homePage/homePageApi";
export default function Home() {


  const { isLoading, error } = getHomePageData();
  const { recentUsers: recentArtist,
    trendingArtists,
    topHits,
    popularHits,
    status }
    : HomePageState = useAppSelector((state: RootState) => state.homepage);

  return (
    <div className="
          bg-neutral-900
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        " >
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
              ">
            Welcome back
          </h1>

          <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
              ">
            <ListItem image="/images/liked.png"
              name="Liked Songs"
              href="Liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs
          </h1>
        </div>
        <div>
          <div className="pt-10 lg:pt-2 sm:pt-1 md:pt-2">
            <h1 className="select-none pt-6 md:px-6 px-8 sm:px-4 pb-6 text-3xl lg:text-2xl md:text-2xl sm:text-xl">
              Artist
            </h1>
            <div className="mt-12">
              <h1 className="px-8 md:px-6 sm:px-4 text-xl mb-6 sm:text-base">
                Top Hits this Week
              </h1>
              {topHits && topHits.length > 0 ? (
                <HorizontalSongsList songs={topHits} />
              ) : (
                <p>No songs available</p>
              )}
            </div>
            <div className="mt-6">
              <h1 className="px-8 md:px-6 sm:px-4 text-xl mb-6 sm:text-base">
                Popular releases
              </h1>
              {popularHits && popularHits.length > 0 ? (
                <HorizontalSongsList songs={popularHits} />
              ) : (
                <p>No songs available</p>
              )}
            </div>
            <div className="h-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
