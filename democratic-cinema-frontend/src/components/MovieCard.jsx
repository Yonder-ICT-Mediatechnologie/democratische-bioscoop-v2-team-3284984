import React from 'react';
import { Button } from "./Button";
/**
 * MovieCard component used for both vote sections and the movie grid.
 * It receives a movie object and displays the poster and title.  When
 * showVoteButton is true a voting button appears.  The click on the
 * card itself triggers navigation to the details page via the onClick
 * prop.  Event propagation on the vote button is stopped so that
 * clicking vote does not trigger navigation.
 */
const MovieCard = ({ movie, small, onClick, showVoteButton }) => {
  return (
    <div
      className="cursor-pointer flex flex-col items-center"
      onClick={() => onClick && onClick()}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className={`${small ? 'h-28 w-40' : 'h-40 w-64'} object-cover rounded-lg shadow-lg`}
      />
      <div className="mt-2 font-semibold text-center text-white">{movie.title}</div>
      {showVoteButton && (
        <Button
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation();
            alert('Bedankt voor je stem!');
          }}
        >
          Stem nu
        </Button>
      )}
    </div>
  );
};

export default MovieCard;