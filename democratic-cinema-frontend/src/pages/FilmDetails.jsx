import React from 'react';

/**
 * FilmDetails displays a single film with its large poster, title,
 * description and a list of available sessions.  Each session row
 * includes a button to reserve seats immediately.  A back link at
 * the top allows users to return to the previous film list.  If
 * movie is undefined (e.g. page reload), nothing is rendered.
 *
 * Props:
 *   movie           – the selected movie object (id, title, image, description, sessions)
 *   setPage        – callback to change pages
 */
const FilmDetails = ({ movie, setPage }) => {
  if (!movie) return null;

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      {/* Back navigation */}
      <button
        className="text-accent text-sm hover:underline flex items-center gap-1"
        onClick={() => setPage('films')}
      >
        {/* Left arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M19.53 11.47a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 11-1.06-1.06L17.94 12 11.22 5.28a.75.75 0 111.06-1.06l7.25 7.25z"
            clipRule="evenodd"
          />
        </svg>
        Terug naar overzicht
      </button>
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full lg:w-1/3 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{movie.title}</h1>
          <p className="text-sm text-gray-400">Categorie: {movie.category}</p>
          <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          <div>
            <h2 className="text-lg font-semibold text-white mt-4 mb-2">Speeltijden</h2>
            <div className="space-y-2">
              {movie.sessions.map((sess) => (
                <div
                  key={sess.date + sess.time}
                  className="flex items-center justify-between bg-secondary border border-secondary rounded-lg px-4 py-3"
                >
                  <div>
                    <div className="text-white font-medium">{sess.date}</div>
                    <div className="text-gray-400 text-sm">{sess.time}</div>
                  </div>
                  <button
                  className="bg-accent hover:bg-accenthover text-white text-sm px-3 py-1 rounded"
                    onClick={() => setPage('reserve')}
                  >
                    Reserveer
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-4 bg-accent hover:bg-accenthover text-white text-sm px-4 py-2 rounded"
            onClick={() => setPage('reserve')}
          >
            Reserveer stoelen
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;