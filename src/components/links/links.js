import { Link } from "react-router-dom";
import { NextlinksSvg } from "../../assets/svg";
import { Fragment } from "react";

const A = ({ href, className, ...props }) => {
  return (
    <Link
      {...props}
      to={href}
      className={`text-[#25a564] hover:underline ${className ?? ""}`}
    ></Link>
  );
};

export const NextLink = ({ href, className, children, ...props }) => {
  return (
    <Link
      {...props}
      to={href}
      className={`flex items-center fill-[#c0c0c0] hover:text-white text-sm hover:fill-[#25a56a] transition-colors duration-300 ${
        className ?? ""
      }`}
    >
      {children}
      <NextlinksSvg className="w-[22px] h-[22px] ml-1" />
    </Link>
  );
};

export const ALink = ({ href, className, ...props }) => {
  return (
    <Link
      {...props}
      to={href}
      className={`text-white hover:text-[#25a564] transition-colors duration-300 ${
        className ?? ""
      }`}
    ></Link>
  );
};

export const ArtistsLinks = ({ artists, className = "" }) => {
  return artists.map((artist, index) => (
    <Fragment key={artist.id}>
      <Link
        className={`hover:text-[#25a564] transition-colors duration-300 ${
          className ?? ""
        }`}
        href={`#artist-${artist.id}`}
      >
        {artist.name}
      </Link>
      {index < artists.length - 1 && ", "}
    </Fragment>
  ));
};

export default A;
