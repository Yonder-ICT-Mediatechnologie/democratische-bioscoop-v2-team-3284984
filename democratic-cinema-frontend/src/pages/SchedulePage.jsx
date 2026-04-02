import { useState, useMemo, useEffect } from 'react';

const SchedulePage = ({ setPage, setCurrentMovie }) => {
  const [selected, setSelected] = useState(null);
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

  const scheduleByDate = useMemo(() => {
    const map = {};

    movies.forEach((movie) => {
      if (!movie.date) return;

      const dateKey = String(movie.date);

      if (!map[dateKey]) {
        map[dateKey] = [];
      }

      map[dateKey].push(movie);
    });

    return map;
  }, [movies]);

  function formatDate(timestamp) {
  const date = new Date(Number(timestamp));

  return date.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

  const sortedDates = useMemo(() => {
    return Object.keys(scheduleByDate).sort((a, b) => new Date(a) - new Date(b));
  }, [scheduleByDate]);

  const dayLabels = useMemo(() => {
    return sortedDates.map((_, idx) => {
      if (idx === 0) return 'Vandaag';
      if (idx === 1) return 'Morgen';
      return 'Later';
    });
  }, [sortedDates]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Speelschema</h1>

        {sortedDates.length === 0 ? (
          <div className="text-gray-400">Geen films met datum gevonden.</div>
        ) : (
          sortedDates.map((date, idx) => (
            <div key={date} className="mb-8">
              <h2 className="text-lg font-semibold text-white flex items-baseline gap-2">
                <span>{dayLabels[idx]}</span>
                <span className="text-sm text-gray-400">({formatDate(date)})</span>
              </h2>

              <div className="mt-2 space-y-2">
                {scheduleByDate[date].map((movie) => {
                  const movieId = movie._id || movie.id || movie.idFilm || movie.title;

                  return (
                    <div
                      key={`${movieId}-${date}`}
                      className="flex justify-between items-center bg-secondary hover:bg-primary border border-secondary rounded-lg px-4 py-3 cursor-pointer"
                      onClick={() => setSelected(movie)}
                    >
                      <div>
                        <div className="text-white font-medium">{movie.title}</div>
                        <div className="text-gray-400 text-sm">
                          {movie.category || 'Geen categorie'}
                        </div>
                      </div>

                      <button
                        className="text-accent text-sm font-medium hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMovie(movie);
                          setPage('details');
                        }}
                      >
                        Info
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {selected && (
        <div className="lg:w-1/3 bg-secondary border border-primary rounded-lg p-4 shadow-lg h-fit sticky top-24">
          <img
            src={selected.url_image}
            alt={selected.title}
            className="w-full h-48 object-cover rounded-md"
          />

          <h3 className="mt-4 text-xl font-semibold text-white">
            {selected.title}
          </h3>

          <p className="text-gray-400 text-sm">{selected.category || '—'}</p>

          <p className="text-gray-400 text-sm mt-1">
            {selected.date || 'Geen datum'}
          </p>

          <p className="mt-3 text-gray-300 text-sm">
            {selected.description || 'Geen beschrijving beschikbaar'}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              className="bg-accent hover:bg-accenthover text-white text-sm font-medium px-3 py-2 rounded"
              onClick={() => {
                setCurrentMovie(selected);
                setPage('reserve');
              }}
            >
              Reserveer stoelen
            </button>

            <button
              className="text-accent border border-accent text-sm font-medium px-3 py-2 rounded hover:bg-accent hover:text-white"
              onClick={() => {
                setCurrentMovie(selected);
                setPage('details');
              }}
            >
              Meer info
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;