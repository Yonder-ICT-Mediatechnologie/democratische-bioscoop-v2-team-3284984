const FilmDetails = ({ movie, setPage }) => {
  if (!movie) {
    return (
      <div className="p-4 md:p-8 max-w-5xl mx-auto text-white">
        Film niet gevonden.
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <button
        className="text-accent text-sm hover:underline flex items-center gap-1"
        onClick={() => setPage('films')}
      >
        Terug naar overzicht
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={movie.url_image}
          alt={movie.title}
          className="w-full lg:w-1/3 object-cover rounded-lg shadow-lg"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {movie.title}
          </h1>

          <p className="text-sm text-gray-400">
            Categorie: {movie.category || '—'}
          </p>

          <p className="text-gray-300 leading-relaxed">
            {movie.description || 'Geen beschrijving beschikbaar'}
          </p>

          {movie.url_trailer && (
            <a
              href={movie.url_trailer}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-accent hover:bg-accenthover text-white text-sm px-4 py-2 rounded"
            >
              Bekijk trailer
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;