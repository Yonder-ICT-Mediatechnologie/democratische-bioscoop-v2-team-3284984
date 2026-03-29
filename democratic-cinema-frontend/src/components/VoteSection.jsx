import React from 'react';
import MovieCard from './MovieCard';
import { Button } from "./Button";

/**
 * VoteSection component for the voting page.  It accepts a title
 * label (e.g. "Vandaag" or "Volgende week"), a small info string
 * about when the chosen film will play and an array of movies to
 * present for voting.  The timer and navigation to the next
 * stemronde are purely decorative.
 */
const VoteSection = ({ title, info, movies }) => {
  return (
    <section className="py-8 px-4 md:px-8 bg-secondary my-4 shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">

        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="inline-flex">
            <div className="bg-accent px-6 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
              {title}
            </div>
            <div className="ml-[-5px] w-8 bg-accent  [transform:skewX(-12deg)]" />
          </div>
          
        </div>
<div className="text-lg md:text-2xl font-semibold">Breng nu jouw stem uit!</div>
        <div className="text-xs text-gray-400 flex flex-col gap-1">
          <div className="text-xs text-gray-400 flex items-center gap-1">
            Nieuwe stemronde in: <span className="font-semibold text-white">09:12:56 uur</span>
          <span className="ml-1 text-[30px]">∞</span>
          </div>
          <Button className="ml-3">
            Bekijk alle stemrondes
          </Button>
        </div>
      </div>
      <div className="text-sm text-gray-400 mb-4">{info}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} showVoteButton={true} />
        ))}
      </div>
    </section>
  );
};

export default VoteSection;