import React, { useState } from 'react';
import movies from '../data/movies';
import MovieCard from '../components/MovieCard';
import { Button } from '../components/Button';
import Search from '../components/Search';

/**
 * FilmsPage lists all movies in the catalogue.  Users can filter by
 * category and search by title.  Clicking on a movie switches to the
 * detail page and sets the currentMovie in the parent.  The category
 * buttons are generated from the available categories in the movies
 * array with an 'Alle' option to show everything.
 *
 * Props:
 *   setPage        – callback to change the active page
 *   setCurrentMovie – callback to set the currently selected film
 */
const FilmsPage = ({ setPage, setCurrentMovie }) => {
  // Extract unique categories from the movies list
  const categories = ['Alle', ...Array.from(new Set(movies.map((m) => m.category)))];
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter movies by selected category and search term
  const filtered = movies.filter((m) => {
    const matchesCategory = activeCategory === 'Alle' || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6 ">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Films</h1>

      <div className='flex flex-wrap items-center justify-between gap-2'>
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            // <button
            //   key={cat}
            //   className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            //     activeCategory === cat
            //       ? 'bg-accent text-white'
            //       : 'bg-secondary text-gray-300 hover:bg-accent hover:text-white'
            //   }`}
            //   onClick={() => setActiveCategory(cat)}
            // >
            //   {cat}
            // </button>
            <Button
              key={cat}
              className={`text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-gray-300 hover:bg-accent hover:text-white'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

          <Search
                  placeholder="Zoeken"
                  className="w-[264px]"
                  inputClassName="text-[26px] py-3"
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
      </div>
          {/* Simple search icon (magnifying glass) */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17.65 17.65A7.5 7.5 0 1117.65 2.5a7.5 7.5 0 010 15z"
            />
          </svg>
        </button> */}
      {/* </div> */}

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => {
              setCurrentMovie(movie);
              setPage('details');
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="text-gray-400 col-span-full text-center">Geen resultaten gevonden.</div>
        )}
      </div>
    </div>
  );
};

export default FilmsPage;