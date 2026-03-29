import Elf from '../assets/elf.png';
import Fnaf from '../assets/fnaf.png';
import Dictator from '../assets/dictator.png';
import Superman from '../assets/superman.png';

// A small catalogue of films used throughout the site.  Each entry
// contains an identifier, title, a poster image, a category, a
// description and a list of sessions.  Prices are also stored here
// for the checkout calculation.
const movies = [
  {
    id: 'elf',
    title: 'Elf',
    image: Elf,
    category: 'Comedy',
    description:
      "Elf is a heart‑warming comedy about a human raised among Santa’s elves who ventures to New York City in search of his true identity.",
    sessions: [
      { date: 'February 25, 2025', time: '19:44', category: 'Comedy' },
      { date: 'February 26, 2025', time: '18:14', category: 'Comedy' },
      { date: 'February 27, 2025', time: '20:30', category: 'Comedy' },
    ],
    price: 7.5,
  },
  {
    id: 'fnaf',
    title: "Five Nights at Freddy's",
    image: Fnaf,
    category: 'Horror',
    description:
      "Inspired by the horror game, Five Nights at Freddy's follows a night guard who discovers that the animatronic mascots in a pizzeria have a life of their own.",
    sessions: [
      { date: 'February 25, 2025', time: '21:30', category: 'Horror' },
      { date: 'February 26, 2025', time: '20:45', category: 'Horror' },
      { date: 'February 27, 2025', time: '22:00', category: 'Horror' },
    ],
    price: 7.5,
  },
  {
    id: 'dictator',
    title: 'The Dictator',
    image: Dictator,
    category: 'Comedy',
    description:
      'A satirical comedy following the outrageous antics of a narcissistic dictator who travels to the West and accidentally experiences life as an ordinary citizen.',
    sessions: [
      { date: 'February 28, 2025', time: '09:44', category: 'Comedy' },
      { date: 'March 1, 2025', time: '11:15', category: 'Comedy' },
      { date: 'March 2, 2025', time: '15:00', category: 'Comedy' },
    ],
    price: 7.5,
  },
  {
    id: 'superman',
    title: 'Superman',
    image: Superman,
    category: 'Action',
    description:
      'An epic superhero adventure telling the story of a powerful hero who protects the world from evil and inspires hope in people everywhere.',
    sessions: [
      { date: 'February 28, 2025', time: '12:45', category: 'Action' },
      { date: 'March 1, 2025', time: '14:00', category: 'Action' },
      { date: 'March 2, 2025', time: '17:30', category: 'Action' },
    ],
    price: 7.5,
  },
];

export default movies;