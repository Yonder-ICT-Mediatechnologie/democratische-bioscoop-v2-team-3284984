import React from 'react';
import ChairIcon from '../assets/chair.svg';

const SeatSelection = ({ movie, selectedSeats, setSelectedSeats, setPage }) => {
  if (!movie) return null;

  const rows = 5;
  const cols = 8;
  const rowLabels = ['A', 'B', 'C', 'D', 'E'];

  const reservedSeats = new Set(['A3', 'A4', 'B2', 'B3', 'C5', 'C6', 'D7', 'E4', 'E6']);

  const toggleSeat = (seatId) => {
    if (reservedSeats.has(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // fallback цена
  const price = movie.price ?? 7.5;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Stoelen reserveren
        </h1>

        <div className="overflow-x-auto">
          <div className="inline-block border border-secondary rounded-lg p-4 bg-primary">
            <div className="grid grid-cols-8 gap-2 justify-center">
              {rowLabels.flatMap((row) =>
                Array.from({ length: cols }, (_, colIndex) => {
                  const seatId = `${row}${colIndex + 1}`;
                  const selected = selectedSeats.includes(seatId);
                  const reserved = reservedSeats.has(seatId);

                  const seatColour = reserved
                    ? 'bg-danger cursor-not-allowed'
                    : selected
                    ? 'bg-accent'
                    : 'bg-secondary';

                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeat(seatId)}
                      className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded ${seatColour} hover:bg-accent/60 transition-colors`}
                      disabled={reserved}
                    >
                      <img
                        src={ChairIcon}
                        alt="stoel"
                        className={`w-4 h-4 ${selected || reserved ? 'invert' : ''}`}
                      />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary rounded"></div>
            Vrij
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded"></div>
            Geselecteerd
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-danger rounded"></div>
            Bezet
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:w-1/3 bg-secondary border border-primary rounded-lg p-4 space-y-3 h-fit sticky top-24">
        <img
          src={movie.url_image}
          alt={movie.title}
          className="w-full h-40 object-cover rounded-md"
        />

        <h2 className="text-xl font-semibold text-white">{movie.title}</h2>

        <p className="text-gray-400 text-sm">{movie.category || '—'}</p>

        <div className="mt-2 text-gray-300 text-sm">
          Geselecteerde stoelen:{' '}
          {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'geen'}
        </div>

        <div className="text-gray-300 text-sm">
          Prijs per stoel: €{price.toFixed(2)}
        </div>

        <div className="text-white font-semibold">
          Totaal: €{(selectedSeats.length * price).toFixed(2)}
        </div>

        <button
          className="w-full bg-accent hover:bg-accenthover text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-40"
          disabled={selectedSeats.length === 0}
          onClick={() => setPage('checkout')}
        >
          Bestel tickets
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;