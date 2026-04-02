import { useEffect, useState } from 'react';
import VoteSection from '../components/VoteSection';
import MovieCard from '../components/MovieCard';

const HomePage = ({ setPage, setCurrentMovie }) => {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/films`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const normalizedMovies = Array.isArray(data)
        ? data
        : data.films || data.data || [];

      return normalizedMovies;
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

  return (
    <div className="space-y-12">
      <VoteSection
        title="Vandaag"
        info="Wordt vertoond op onze eerstvolgende voorstelling."
        movies={todayMovies}
      />

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Bekijk onze films
          </h2>

          <div className="flex gap-4">
            <button
              className="text-accent hover:underline text-sm"
              onClick={() => setPage('voting')}
            >
              Naar stemmen →
            </button>

            <button
              className="text-accent hover:underline text-sm"
              onClick={() => setPage('films')}
            >
              Alle films →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id || movie.id}
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