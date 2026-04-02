import { useEffect, useState } from 'react';
import VoteSection from '../components/VoteSection';
import MovieCard from '../components/MovieCard';

/**
 * HomePage shows the main landing page for the democratische bioscoop. It
 * contains two voting sections (for today and next week) and a grid of
 * available films.  Each movie poster is clickable – selecting it
 * updates the currentMovie in the parent and navigates to the details
 * page via the provided setPage function.
 *
 * Props:
 *   setPage        – callback to switch between pages
 *   setCurrentMovie – callback to set the currently selected movie
 */
const HomePage = ({ setPage, setCurrentMovie }) => {
  // Split movies into two groups for voting.  If your catalogue grows
  // beyond four films you can adjust the slice indices or filter by
  // category/date.  Here we simply take the first two as "today" and
  // the remainder as "next week".

  const [movies, setMovies] = useState([]);
  
  async function fetchMovies() {
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + '/films');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  }
  useEffect(() => {
    fetchMovies().then((movieData) => {
      setMovies(movieData);
    });
  }, []);


  const todayMovies = movies.slice(0, 2);
  const nextWeekMovies = movies.slice(2);

  return (
    <div className="space-y-12">
      {/* Voting sections */}
      <VoteSection
        title="Vandaag"
        info="Wordt vertoond op onze eerstvolgende voorstelling."
        movies={todayMovies}
      />
      <VoteSection
        title="Volgende week"
        info="Stem mee welke film er volgende week draait."
        movies={nextWeekMovies}
      />

      {/* Film catalogue */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Bekijk onze films</h2>
          <button
            className="text-accent hover:underline text-sm"
            onClick={() => setPage('films')}
          >
            Alle films →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {
                setCurrentMovie(movie);
                setPage('details');
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;