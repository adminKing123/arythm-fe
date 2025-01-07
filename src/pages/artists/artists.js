import { scrollTo } from "../../api/utils";

const Artists = () => {
  document.title = "Artists";
  scrollTo("main-content", { top: 0, behavior: "instant" });

  return (
    <>
      <section className="p-[30px]">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-white text-[30px]">Artists</h2>
        </div>
      </section>
      <section className="p-[30px] border-t border-b border-[#2a2a2a]"></section>
    </>
  );
};

export default Artists;
