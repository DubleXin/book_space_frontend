import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div
      className="
        min-h-8 w-full rounded-full
        bg-neutral-100 border border-neutral-100
        flex items-center gap-2 px-3
        overflow-hidden
        hover:bg-neutral-200 hover:border-neutral-300

        focus-within:bg-white
        focus-within:border-blue-500
        focus-within:ring-2
        focus-within:ring-blue-500/30
        focus-within:text-blue-500

        dark:bg-slate-600 dark:border-slate-600
        dark:hover:bg-slate-700 dark:hover:border-slate-600
        dark:focus-within:bg-slate-800
        dark:text-white
        dark:focus-within:text-blue-300
      "
    >
      <Search className="h-4 w-4  " />

      <input
        id="top-searchbar"
        className="
          w-full bg-transparent
          outline-none
          focus:outline-none
          focus:ring-0
          text-stone-950
          dark:text-white
        "
        placeholder="explore"
      />
    </div>
  );
};

export default SearchBar;
