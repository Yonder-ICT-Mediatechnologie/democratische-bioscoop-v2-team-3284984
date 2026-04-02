import { useEffect, useState } from 'react';
import VoteSection from '../components/VoteSection';

const VotingPage = ({ setPage }) => {
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
  const nextWeekMovies = movies.slice(2);

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Stemmen
        </h1>

        <button
          className="text-accent hover:underline text-sm"
          onClick={() => setPage('home')}
        >
          ← Terug naar home
        </button>
      </div>

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
    </div>
  );
};

export default VotingPage;