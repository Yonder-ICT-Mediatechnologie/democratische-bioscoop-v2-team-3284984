import React, { useState } from 'react';

/**
 * CheckoutPage displays the final order summary along with input
 * fields for the purchaser’s name and email address.  After
 * submitting the form the setEmailSent callback is triggered and
 * navigation returns to the home page.  A disabled state prevents
 * submission until both name and email fields are filled in.
 *
 * Props:
 *   movie         – the selected movie
 *   seats         – array of seat IDs
 *   setPage      – callback to navigate away after purchase
 *   setEmailSent – callback to indicate the confirmation email was sent
 */
const CheckoutPage = ({ movie, seats, setPage, setEmailSent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const totalPrice = seats.length * (movie?.price || 0);

  if (!movie) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    // Simulate sending confirmation email
    setEmailSent(true);
    alert('Dank je! Een bevestigingsmail is verstuurd.');
    // Return to home page after checkout
    setPage('home');
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Order summary */}
      <div className="lg:w-1/2 bg-secondary border border-primary rounded-lg p-4 space-y-3">
        <h2 className="text-xl font-semibold text-white mb-3">Samenvatting</h2>
        <div className="flex gap-4 items-start">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-32 h-32 object-cover rounded-md"
          />
          <div>
            <div className="text-lg font-semibold text-white">{movie.title}</div>
            <div className="text-sm text-gray-400">{movie.category}</div>
            <div className="text-sm text-gray-400 mt-2">Stoelen: {seats.join(', ')}</div>
            <div className="text-sm text-gray-400">Prijs per stoel: €{movie.price.toFixed(2)}</div>
            <div className="text-white font-semibold mt-2">
              Totaal: €{totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      {/* Checkout form */}
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
              E‑mail
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