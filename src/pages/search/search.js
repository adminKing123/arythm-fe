// import { useState } from "react";
// import ReactDOM from "react-dom";
import { SearchInput } from "../../components/Inputs/inputs";
import SortOptions from "../../components/selectors/sortoptions";
// import { motion, AnimatePresence } from "framer-motion";

// const SearchModal = ({ isOpen, toggle }) => {
//   const handleClose = () => toggle(false);

//   return ReactDOM.createPortal(
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="absolute flex justify-center items-center top-0 left-0 w-screen h-screen bg-[#4f4f4f82] z-20"
//           onClick={handleClose}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.1 }}
//         >
//           <motion.div
//             onClick={(e) => e.stopPropagation()}
//             className="w-full max-w-[680px] min-w-[280px] bg-[#16151A] rounded-xl shadow-2xl"
//             initial={{ scale: 0.8 }}
//             animate={{ scale: 1 }}
//             exit={{ scale: 0.8 }}
//             transition={{ duration: 0.1 }}
//           >
//             <div className="p-[30px] border-b border-[#c0c0c0] flex justify-between items-center">
//               <h3 className="text-xl">Filter and Play Your Music</h3>
//               <button
//                 onClick={handleClose}
//                 className="text-sm px-2 rounded-lg bg-[#2b2b2b] hover:bg-[#c0c0c0] hover:text-black duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>,
//     document.body
//   );
// };
// const SearchModalToggler = () => {
//   const [open, setOpen] = useState(true);
//   return (
//     <>
//       <button
//         onClick={() => setOpen(!open)}
//         className="ml-[10px] text-sm py-2 px-3 border rounded-lg bg-gradient-to-r from-[#2a2a2a] to-[#333333] text-[#ddd] hover:from-[#333333] hover:to-[#444444] hover:text-[#fff] border-[#555] hover:border-[#666] shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
//       >
//         Filters
//       </button>
//       <SearchModal isOpen={open} toggle={setOpen} />
//     </>
//   );
// };

const Search = () => {
  document.title = "Search";

  return (
    <>
      <section className="p-[30px]">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-white text-[30px]">Search</h2>
        </div>
      </section>
      <section className="p-[30px] border-t border-b border-[#2a2a2a]">
        <div className="flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center">
            <div className="w-[220px]">
              <SearchInput />
            </div>
            {/* <SearchModalToggler /> */}
          </div>
          <SortOptions
            options={[
              {
                id: 1,
                name: "Featured",
              },
              {
                id: 2,
                name: "Popular",
              },
              {
                id: 3,
                name: "Newest",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default Search;
