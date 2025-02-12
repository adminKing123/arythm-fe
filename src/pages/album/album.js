import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get_src_uri, numeral, scrollTo } from "../../api/utils";
import SongCard, { SongCardLoading } from "../../components/songcards/songcard";
import { useAlbumSongsInfinite } from "../../api/album/queryHooks";
import Button from "../../components/buttons/buttons";

const AlbumHeader = ({ album, count }) => {
  return (
    <section className="p-5 flex items-end gap-6 relative bg-black">
      <img
        alt="thumbnail"
        src={get_src_uri(album.thumbnail300x300)}
        className="object-cover w-full h-full absolute top-0 left-0 blur-3xl"
      />
      <div className="w-64 aspect-square rounded overflow-hidden relative">
        <img alt="thumbnail" src={get_src_uri(album.thumbnail300x300)} />
      </div>
      <div className="relative mb-2">
        <h3 className="text-3xl font-bold text-white">{album.title}</h3>
        <p className="text-white text-sm">
          {album.year} • {numeral(count)} songs • Followers
        </p>
        <div className="relative mt-3">
          <Button>Follow</Button>
        </div>
      </div>
    </section>
  );
};

const SongsList = ({ data, isFetchingNextPage, hasNextPage }) => {
  return (
    <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-5">
      {data.map((page, index) => (
        <React.Fragment key={index}>
          {page.results.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && hasNextPage
        ? Array.from({ length: 6 }).map((_, index) => (
            <SongCardLoading key={index} />
          ))
        : null}
    </div>
  );
};

const Listing = () => {
  const id = parseInt(useParams().id);
  const {
    isError,
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useAlbumSongsInfinite(id, 24, {
    cacheTime: 0,
  });

  useEffect(() => {
    const handleScroll = (e) => {
      const bottom =
        e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 10;
      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
      console.log(
        e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 10
      );
    };

    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError)
    return <div className="text-center text-xl mt-4">No Result Found</div>;
  if (isLoading)
    return (
      <>
        <div className="h-[290px] w-full skeleton mb-5"></div>
        <section>
          <div className="grid gap-[30px] mt-8 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-5">
            {Array.from({ length: 24 }).map((_, index) => (
              <SongCardLoading key={index} />
            ))}
          </div>
        </section>
      </>
    );

  document.title = data.pages[0].album.title;
  return (
    <>
      <AlbumHeader album={data.pages[0].album} count={data.pages[0].count} />
      <section>
        <SongsList
          data={data.pages}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </section>
    </>
  );
};

const Album = () => {
  const id = useParams().id;
  document.title = "Album";

  useEffect(() => {
    scrollTo("main-content", { top: 0, behavior: "instant" });
  }, [id]);

  return <Listing />;
};

export default Album;
