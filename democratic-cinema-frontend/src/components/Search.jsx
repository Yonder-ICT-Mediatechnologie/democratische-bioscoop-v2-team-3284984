import React from "react";
import SearchIcon from '../assets/icons/search.svg';

export const Search = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  icon,
  onSubmit,
}) => {
  return (
    <div
      className={`flex items-center bg-secondary rounded-md overflow-hidden ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 bg-transparent text-sm px-3 py-2 focus:outline-none ${inputClassName}`}
      />

      <button
        onClick={() => onSubmit?.(value)}
        className="px-3 py-2 text-gray-400 hover:text-white"
        aria-label="search"
      >
        {icon || <img src={SearchIcon} alt="Search" />}
      </button>
    </div>
  );
};
export default Search;