import { ALink, ArtistsLinks } from "../../components/links/links";
import { get_src_uri, numeral } from "../../api/utils";
import { HeadphoneSvg, PlaylistsSvg, PlaySvg } from "../../assets/svg";
import { Link } from "react-router-dom";

const SongCard = ({ song }) => {
  return (
    <div>
      <div className="relative flex flex-col items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-[#000] group">
        <img
          className="absolute top-0 left-0 w-full aspect-square group-hover:opacity-[0.6] group-hover:scale-[1.08] transition-all duration-500"
          alt={song.album.id}
          src={get_src_uri(song.album.thumbnail300x300)}
        />
        <Link className="flex justify-center items-center w-14 h-14 bg-[#222227] rounded-xl relative scale-[0.8] opacity-0 group-hover:scale-[1] group-hover:opacity-100 transition-all duration-500">
          <PlaySvg className="w-6 h-6 fill-white" />
        </Link>
        <span className="absolute flex items-center justify-center w-full bottom-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Link className="text-white fill-white text-[13px] mr-[15px] flex items-center gap-1">
            <PlaylistsSvg className="w-[13px] h-[13px]" />
            {song?.playlists_count || 0}
          </Link>
          <Link className="text-white fill-white text-[13px] mr-[15px] flex items-center gap-1">
            <HeadphoneSvg className="w-[13px] h-[13px]" />
            {numeral(song.count)}
          </Link>
        </span>
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
