import React, { useState, useMemo } from 'react';
import movies from '../data/movies';

/**
 * SchedulePage aggregates all film sessions across dates and displays
 * them grouped by day.  Users can click on a session to see more
 * details in the side card, or click "Info" to jump to the film
 * details page.  The day labels (Vandaag, Morgen, Volgende week)
 * are calculated relative to the sorted schedule, assuming the first
 * two days correspond to today and tomorrow.
 *
 * Props:
 *   setPage        – callback to change the active page
 *   setCurrentMovie – callback to set the currently selected film
 */
const SchedulePage = ({ setPage, setCurrentMovie }) => {
  const [selected, setSelected] = useState(null);

  // Build a mapping from date string to an array of { movie, time }
  const scheduleByDate = useMemo(() => {
    const map = {};
    movies.forEach((movie) => {
      movie.sessions.forEach((session) => {
        if (!map[session.date]) map[session.date] = [];
        map[session.date].push({ movie, time: session.time });
      });
    });
    return map;
  }, []);

  // Sort dates chronologically using Date parsing
  const sortedDates = useMemo(() => {
    return Object.keys(scheduleByDate).sort((a, b) => new Date(a) - new Date(b));
  }, [scheduleByDate]);

  // Assign human‑friendly labels to the first few dates
  const dayLabels = useMemo(() => {
    return sortedDates.map((_, idx) => {
      if (idx === 0) return 'Vandaag';
      if (idx === 1) return 'Morgen';
      return 'Volgende week';
    });
  }, [sortedDates]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">Speelschema</h1>
        {sortedDates.map((date, idx) => (
          <div key={date} className="mb-8">
            <h2 className="text-lg font-semibold text-white flex items-baseline gap-2">
              <span>{dayLabels[idx]}</span>
              <span className="text-sm text-gray-400">({date})</span>
            </h2>
            <div className="mt-2 space-y-2">
              {scheduleByDate[date].map((entry) => (
                <div
                  key={entry.movie.id + entry.time}
                  className="flex justify-between items-center bg-secondary hover:bg-primary border border-secondary rounded-lg px-4 py-3 cursor-pointer"
                  onClick={() =>
                    setSelected({ movie: entry.movie, date, time: entry.time })
                  }
                >
                  <div>
                    <div className="text-white font-medium">{entry.time}</div>
                    <div className="text-gray-400 text-sm">{entry.movie.title}</div>
                  </div>
                  <button
                    className="text-accent text-sm font-medium hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMovie(entry.movie);
                      setPage('details');
                    }}
                  >
                    Info
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Side card showing selected session details */}
      {selected && (
        <div className="lg:w-1/3 bg-secondary border border-primary rounded-lg p-4 shadow-lg h-fit sticky top-24">
          <img
            src={selected.movie.image}
            alt={selected.movie.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="mt-4 text-xl font-semibold text-white">
            {selected.movie.title}
          </h3>
          <p className="text-gray-400 text-sm">{selected.movie.category}</p>
          <p className="text-gray-400 text-sm mt-1">
            {selected.date} • {selected.time}
          </p>
          <p className="mt-3 text-gray-300 text-sm">
            {selected.movie.description}
          </p>
          <div className="mt-4 flex gap-3">
            <button
              className="bg-accent hover:bg-accenthover text-white text-sm font-medium px-3 py-2 rounded"
              onClick={() => {
                setCurrentMovie(selected.movie);
                setPage('reserve');
              }}
            >
              Reserveer stoelen
            </button>
            <button
              className="text-accent border border-accent text-sm font-medium px-3 py-2 rounded hover:bg-accent hover:text-white"
              onClick={() => {
                setCurrentMovie(selected.movie);
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