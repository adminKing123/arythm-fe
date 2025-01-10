import { scrollTo } from "../../api/utils";
import { BookmarkSvg } from "../../assets/svg";
import Button from "../../components/buttons/buttons";
import { ALink } from "../../components/links/links";
import { SongCard3 } from "../../components/songcards/songcard";
import ROUTES from "../../router/routes";
import authConfigStore from "../../zstore/authConfigStore";
import playerStore from "../../zstore/playerStore";

const ShowCurrentPlayingSong = () => {
  const current_song = playerStore((state) => state.song);

  return <div></div>;
};

const QueueHeader = () => {
  const clearQueue = playerStore((state) => state.clearQueue);
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <h2 className="text-white text-[30px]">Manage Your Song Queue</h2>
      <div className="flex justify-center items-center gap-5">
        <ALink
          className={
            "flex items-center gap-2 bg-[#222227] px-4 py-2 rounded-lg group"
          }
        >
          <BookmarkSvg className="w-4 h-4 fill-white group-hover:fill-[#25a564] transition-colors duration-300" />
          Save
        </ALink>
        <ALink onClick={clearQueue} className="text-[16px]">
          Clear Queue
        </ALink>
      </div>
    </div>
  );
};

const QueueList = () => {
  const queue = playerStore((state) => state.queue);
  const removeSong = playerStore((state) => state.removeSong);

  return queue.length ? (
    <>
      <div className="grid gap-[15px] mt-8 grid-cols-1 md:grid-cols-1">
        {queue.map((song, index) => (
          <SongCard3
            index={index}
            key={song.id}
            song={song}
            onClickRemove={() => removeSong(index)}
          />
        ))}
      </div>
    </>
  ) : (
    <div className="col-span-full flex justify-center items-center p-8 rounded-lg">
      <div className="text-center">
        <h3 className="text-xl text-white mb-1">No Songs Found</h3>
        <p className="text-gray-400 mb-2">
          Looks like you don't have any songs in your queue yet. Add your first
          one!
        </p>
        <Button>Add Songs</Button>
      </div>
    </div>
  );
};

const QueueContainer = () => {
  return (
    <>
      <QueueHeader />
      <QueueList />
    </>
  );
};

const Queue = () => {
  document.title = "Manage Queue";
  scrollTo("main-content", { top: 0, behavior: "instant" });
  const user = authConfigStore((state) => state.user);

  if (!user) {
    alert("Please Login To Access This Page!");
    window.location = ROUTES.LOGIN;
    return;
  }

  return (
    <>
      <section className="p-[30px]">
        <QueueContainer />
      </section>
    </>
  );
};

export default Queue;
