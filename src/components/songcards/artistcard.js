import { ALink } from "../../components/links/links";
import { get_src_uri } from "../../api/utils";
import styles from "./css/artistcard.module.css";

const ArtistCard = ({ artist }) => {
  return (
    <div className="group">
      <div
        className={`relative cursor-pointer flex flex-col items-center justify-center w-full aspect-square rounded-xl overflow-hidden bg-[#000] ${styles.artist_cover}`}
      >
        <img
          className="absolute top-0 left-0 w-full aspect-square"
          alt={artist.id}
          src={get_src_uri(artist.thumbnail300x300)}
        />
      </div>
      <p className="mt-2 text-center truncate">
        <ALink className="text-white group-hover:text-[#25a56a]">
          {artist.name}
        </ALink>
      </p>
    </div>
  );
};

export const ArtistCardLoading = () => {
  return (
    <div>
      <div className="w-full aspect-square rounded-xl skeleton"></div>
      <div className="w-full mt-2 flex justify-center">
        <div className="w-1/2 rounded h-[16px] skeleton"></div>
      </div>
    </div>
  );
};

export default ArtistCard;
