import React from 'react';
import Logo from '../assets/logo.svg';
import SearchIcon from '../assets/icons/search.svg';
import { Search } from './Search';



/**
 * Navigation bar component.  It displays the logo, the page links and a
 * simple search field.  The search field here does not perform any
 * searching but conveys the look of the original design.  The nav
 * uses conditional styling to highlight the active page.
 */
const Header = ({ currentPage, setPage }) => {
  // Define the main navigation items.  'Films' links to the film list,
  // 'Stemmen' links to the voting/home page, and 'Schema' shows the
  // schedule of screenings.
  const pages = [
    { key: 'films', label: 'Films' },
    { key: 'home', label: 'Stemmen' },
    { key: 'schedule', label: 'Schema' },
  ];
  return (
    <nav className="bg-primary py-4 px-6 flex items-center justify-between border-b border-secondary">
      {/* Logo with link */}
      <a
        href="/stemmen"
        className="flex items-center gap-3"
        onClick={(e) => {
          e.preventDefault();
          setPage('home');
        }}
      >
        <img src={Logo} alt="Logo" className="w-[392px]" />
      </a>
      <ul className="hidden md:flex gap-6 items-center">
        {pages.map((p) => (
          <li key={p.key}>
            <a
              href={p.key === 'home' ? '/stemmen' : p.key === 'films' ? '/films' : p.key === 'schedule' ? '/schema' : '/'}
              className={`text-[26px] font-medium ${
                currentPage === p.key ? 'text-accent' : 'text-gray-300 hover:text-accent'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPage(p.key);
              }}
            >
              {p.label}
            </a>
          </li>
        ))}
      </ul>
      {/* <div className="flex items-center bg-secondary px-2 py-1 rounded-md w-[264px]">
        <input
          type="text"
          placeholder="Zoeken"
          className="bg-transparent placeholder-gray-500 text-[26px] focus:outline-none px-2 py-3"
        />
        <img src={SearchIcon} className='w-[25px] absolute right-10' alt="Search" />
      </div> */}
      <Search
        placeholder="Zoeken"
        className="w-[264px]"
        inputClassName="text-[26px] py-3"
      />
    </nav>
  );
};

export default Header;