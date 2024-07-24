'use client'
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import { RequestStatus } from "@/lib/features/homePage/homePageSlice";
import HorizontalSongsList from "@/components/song/HorizontalSongsList";
import HorizontalArtistList from "@/components/artist/HorizontalArtistList";
import Loading from "@/components/Loading";
import { useHomePageData } from "@/lib/features/homePage/homePageData";
export default function Home() {

  const { recentUsers: recentArtist,
    trendingArtists,
    popularArtists,
    topHits,
    popularHits,
    status } = useHomePageData();
  return (
    <div>
      {status == RequestStatus.Loading ? (
        <Loading />
      ) : (<div className="
          bg-neutral-900
          rounded-lg
          h-full
          w-full
          overflow-hidden
          overflow-y-auto
        " >
        <Header bgColor="" className="bg-gradient-to-b
        from-emerald-800">
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
                href="liked"
              />
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">

          <div className="pt-10 lg:pt-2 sm:pt-1 md:pt-2">
            <div className="mt-12">
              <div className="text-2xl mb-6 font-semibold">
                Popular Artists
              </div>
              {popularArtists && popularArtists.length > 0 ? (
                <HorizontalArtistList artists={popularArtists} />
              ) : (
                <p>No artists available</p>
              )}
            </div>
            <div className="mt-12">
              <div className="text-2xl mb-6 font-semibold">
                Trending Artists
              </div>
              {trendingArtists && trendingArtists.length > 0 ? (
                <HorizontalArtistList artists={trendingArtists} />
              ) : (
                <p>No artists available</p>
              )}
            </div>
            <div className="mt-12">
              <h1 className="text-2xl mb-6 font-semibold">
                Popular releases
              </h1>
              {popularHits && popularHits.length > 0 ? (
                <HorizontalSongsList songs={popularHits} />
              ) : (
                <p>No songs available</p>
              )}
            </div>
            <div className="mt-12">
              <h1 className="text-2xl mb-6 font-semibold">
                Top Soundtrack This Week
              </h1>
              {topHits && topHits.length > 0 ? (
                <HorizontalSongsList songs={topHits} />
              ) : (
                <p>No songs available</p>
              )}
            </div>
            <div className="h-40"></div>
          </div>
        </div>
      </div>)}
    </div>

  );
}
