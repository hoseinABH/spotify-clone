import { AdjustmentsIcon } from '@heroicons/react/solid';

const Search = ({ search, setSearch }) => {
  return (
    <div className="rounded-full max-w-[1100px] bg-[#1a1a1a] overflow-hidden border-[#333333] p-1.5 px-5 pr-8 flex items-center">
      <div className="h-4 w-4 border-2 rounded-full flex-shrink-0 animate-pulse" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#1a1a1a] border-none lg:w-full focus:ring-0 outline-none placeholder:text-[#f1f1f1]"
        placeholder="Search..."
      />
      <div className="flex items-center divide-x-2 divide-[#333] ml-auto">
        <div className="flex space-x-2 pr-5">
          <button className="tag">Minimal</button>
          <button className="tag">House</button>
          <button className="tag">Other</button>
        </div>

        <div className="flex items-center space-x-1.5 text-[#cecece] pl-4">
          <AdjustmentsIcon className="h-5 w-5 animate-pulse" />
          <span className="font-medium">Filtters</span>
        </div>
      </div>
    </div>
  );
};

export default Search;
