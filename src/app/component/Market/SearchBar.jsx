import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onFocus, onBlur, searchValue, setSearchValue }) => {
  return (
    <div className="w-full p-4 pb-2">
      <div className="rounded-lg flex border border-gray-700 items-center w-full">
        <FiSearch className="w-5 h-5 mx-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent py-1 text-white outline-none"
          onFocus={!searchValue && onFocus}
          onBlur={onBlur}
          value={searchValue}
          onChange={(e) => {
            onBlur(e)
            setSearchValue(e.target.value)
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar; 