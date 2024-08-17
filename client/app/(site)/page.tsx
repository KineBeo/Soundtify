import { Suspense } from "react";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import Artist from "@/interfaces/artist";
import Track from "@/interfaces/track";
import dynamic from "next/dynamic";

const HorizontalArtistList = dynamic(
  () => import("@/components/artist/HorizontalArtistList")
);
const HorizontalSongsList = dynamic(
  () => import("@/components/song/HorizontalSongsList")
);
const ReduxStateUpdater = dynamic(
  () => import("@/components/ReduxStateUpdater")
);
async function getHomePageData() {
  const artistsResponse = await fetch(
    "https://soundtify.onrender.com/artist/all-artists"
  );
  const tracksResponse = await fetch(
    "https://soundtify.onrender.com/tracks/all-tracks"
  );

  const artists: Artist[] = await artistsResponse.json();
  const tracks: Track[] = await tracksResponse.json();

  return {
    recentArtists: artists.slice(0, 10),
    trendingArtists: artists.slice(10, 20),
    popularArtists: artists.slice(50, 60),
    topHits: tracks.slice(0, 10),
    popularHits: tracks.slice(31, 56),
    allArtists: artists,
    allTracks: tracks,
  };
}

export default async function Home() {
  const data = await getHomePageData();

  return (
    <div>
      <ReduxStateUpdater data={data} />
      <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header bgColor="" className="bg-gradient-to-b from-emerald-800">
          <div className="mb-2">
            <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
              <ListItem
                image="/images/liked.png"
                name="Liked Songs"
                href="liked"
              />
            </div>
          </div>
        </Header>
        <div className="mt-2 mb-7 px-6">
          <div className="pt-10 lg:pt-2 sm:pt-1 md:pt-2">
            <Suspense fallback={<div>Loading Popular Artists...</div>}>
              <div className="text-2xl mb-6 mt-6 font-semibold">Popular Artists</div>
              <HorizontalArtistList artists={data.popularArtists} />
            </Suspense>
            <Suspense fallback={<div>Loading Trending Artists...</div>}>
            <div className="text-2xl mb-6 mt-6 font-semibold">Trending Artists</div>
              <HorizontalArtistList artists={data.trendingArtists} />
            </Suspense>
            <Suspense fallback={<div>Loading Popular Releases...</div>}>
            <div className="text-2xl mb-6 mt-6 font-semibold">Popular Releases</div>
              <HorizontalSongsList songs={data.popularHits} />
            </Suspense>
            <Suspense fallback={<div>Loading Top Soundtrack...</div>}>
            <div className="text-2xl mb-6 mt-6 font-semibold">Top soundtrack</div>
              <HorizontalSongsList songs={data.topHits} />
            </Suspense>
            <div className="h-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
