export const ContextMenuButton = ({
  title,
  Icon,
  className,
  iconClassName = "fill-white w-[14px] h-[14px]",
  titleClassName = "text-[14px]",
  ...props
}) => {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#222222] ${
        className ?? ""
      }`}
      {...props}
    >
      <Icon className={iconClassName} />
      <span className={titleClassName}>{title}</span>
    </div>
  );
};

export default ContextMenuButton;
