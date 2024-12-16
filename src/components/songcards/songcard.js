import { ALink, ArtistsLinks } from "../../components/links/links";
import { get_src_uri } from "../../api/utils";

const SongCard = ({ song }) => {
  return (
    <div>
      <div>
        <img
          className="w-full aspect-square rounded-xl"
          alt={song.album.id}
          src={get_src_uri(song.album.thumbnail300x300)}
        />
      </div>
      <p className="mt-2 text-white truncate">
        <ALink>{song.original_name}</ALink>
      </p>
      <p className="text-sm truncate">
        <ArtistsLinks artists={song.artists} />
      </p>
    </div>
  );
};

export const SongCardLoading = () => {
  return (
    <div>
      <div className="w-full aspect-square rounded-xl react-loading-skeleton"></div>
      <div className="h-[16px] mt-2 react-loading-skeleton"></div>
      <div className="react-loading-skeleton h-[10px]"></div>
    </div>
  );
};

export default SongCard;
