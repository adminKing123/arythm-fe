import Logo from "../../assets/logo/logo.png";

const SideNavbar = () => {
  return (
    <div className="h-screen w-[280px] border-[#222227] border-r">
      <div className="border-[#222227] border-b h-[70px] px-[30px] flex items-center">
        <img src={Logo} alt="logo" className="w-12" />
      </div>
    </div>
  );
};

export default SideNavbar;
