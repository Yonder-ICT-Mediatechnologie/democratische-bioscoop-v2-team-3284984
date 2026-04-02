import React, { useState } from 'react';

const CheckoutPage = ({ movie, seats, setPage, setEmailSent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!movie) return null;

  const price = movie.price ?? 7.5;
  const totalPrice = seats.length * price;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || seats.length === 0) return;

    setEmailSent(true);
    alert('Dank je! Een bevestigingsmail is verstuurd.');
    setPage('home');
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2 bg-secondary border border-primary rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-semibold text-white mb-3">Samenvatting</h2>

        <div className="flex gap-4 items-start">
          <img
            src={movie.url_image}
            alt={movie.title}
            className="w-32 h-32 object-cover rounded-md"
          />

          <div>
            <div className="text-lg font-semibold text-white">{movie.title}</div>
            <div className="text-sm text-gray-400">{movie.category || '—'}</div>

            <div className="text-sm text-gray-400 mt-2">
              Stoelen: {seats.length > 0 ? seats.join(', ') : 'geen'}
            </div>

            <div className="text-sm text-gray-400">
              Prijs per stoel: €{price.toFixed(2)}
            </div>

            <div className="text-white font-semibold mt-2">
              Totaal: €{totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 bg-secondary border border-primary rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold text-white">Gegevens invoeren</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="name">
              Naam
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-primary border border-secondary text-gray-200 focus:outline-none"
              placeholder="Jouw naam"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-primary border border-secondary text-gray-200 focus:outline-none"
              placeholder="naam@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accenthover text-white text-sm font-medium px-4 py-2 rounded disabled:opacity-40"
            disabled={!name || !email || seats.length === 0}
          >
            Betaal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;