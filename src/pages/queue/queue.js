import Button from "../../components/buttons/buttons";
import { ALink } from "../../components/links/links";
import { SongCard3 } from "../../components/songcards/songcard";
import ROUTES from "../../router/routes";
import authConfigStore from "../../zstore/authConfigStore";
import playerStore from "../../zstore/playerStore";

const Queue = () => {
  document.title = "Manage Queue";
  const user = authConfigStore((state) => state.user);
  const queue = playerStore((state) => state.queue);
  const clearQueue = playerStore((state) => state.clearQueue);
  const removeSong = playerStore((state) => state.removeSong);

  if (!user) {
    alert("Please Login To Access This Page!");
    window.location = ROUTES.LOGIN;
    return;
  }

  return (
    <>
      <section className="p-[30px]">
        {queue.length ? (
          <>
            <div className="flex justify-between items-center flex-wrap">
              <h2 className="text-white text-[30px]">Manage Your Song Queue</h2>
              <ALink onClick={clearQueue} className="text-[16px]">
                Clear Queue
              </ALink>
            </div>
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
                Looks like you don't have any songs in your queue yet. Add your
                first one!
              </p>
              <Button>Add Songs</Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Queue;
