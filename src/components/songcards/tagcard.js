const TagCard = ({ tag }) => {
  return (
    <div className="group cursor-pointer border rounded-lg border-[#4c4c4c] bg-[#141414] hover:bg-[#25a56a] py-2 duration-300 transition-colors">
      <p className="text-center text-white group-hover:white truncate duration-300 transition-colors">
        #{tag.name}
      </p>
    </div>
  );
};

export const TagCardLoading = () => {
  return <div className="skeleton rounded-lg h-[42px]"></div>;
};

export default TagCard;
