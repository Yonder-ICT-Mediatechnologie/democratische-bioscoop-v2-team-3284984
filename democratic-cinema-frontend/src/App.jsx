import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FilmsPage from './pages/FilmsPage';
import SchedulePage from './pages/SchedulePage';
import FilmDetails from './pages/FilmDetails';
import SeatSelection from './pages/SeatSelection';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/admin/RegisterPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';

/**
 * Top‑level application component.  State variables determine which page
 * is visible, which movie is selected and which seats have been chosen.
 * Simple conditional rendering swaps out the main content based on the
 * page.  A useEffect hook scrolls back to the top whenever the page
 * changes.
 */
function App() {
  // Map routes to page keys and vice versa.  These helpers convert
  // between the URL path and the internal page identifier.  The
  // '/stemmen' path is used for the voting/home page.
  const pathToPage = (path) => {
    switch (path) {
      case '/register':
        return 'register';
      case '/login':
        return 'login';
      case '/dashboard':
        return 'dashboard';
      case '/films':
        return 'films';
      case '/schema':
        return 'schedule';
      case '/details':
        return 'details';
      case '/reserve':
        return 'reserve';
      case '/checkout':
        return 'checkout';
      case '/stemmen':
      case '/':
      default:
        return 'home';
    }
  };
  const pageToPath = (p) => {
    switch (p) {
      case 'register':
        return '/register';
      case 'login':
        return '/login';
      case 'dashboard':
        return '/dashboard';
      case 'films':
        return '/films';
      case 'schedule':
        return '/schema';
      case 'details':
        return '/details';
      case 'reserve':
        return '/reserve';
      case 'checkout':
        return '/checkout';
      case 'home':
      default:
        return '/stemmen';
    }
  };

  // Initialize state based on the current URL
  const [page, setPageState] = useState(() => pathToPage(window.location.pathname));
  const [currentMovie, setCurrentMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  // Wrapper to update both the URL and the internal page state
  const setPage = (newPage) => {
    const newPath = pageToPath(newPage);
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    setPageState(newPage);
  };

  // Listen for browser navigation events and update page state accordingly
  useEffect(() => {
    const handlePop = () => {
      setPageState(pathToPage(window.location.pathname));
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Determine which component to render based on current page
  let content = null;
  if (page === 'home') {
    content = <HomePage setPage={setPage} setCurrentMovie={setCurrentMovie} />;
  } else if (page === 'register') {
    content = <RegisterPage />;
  } else if (page === 'login') {
    content = <LoginPage />;
  } else if (page === 'films') {
    content = <FilmsPage setPage={setPage} setCurrentMovie={setCurrentMovie} />;
  } else if (page === 'dashboard') {
    content = <DashboardPage />;
  } else if (page === 'schedule') {
    content = <SchedulePage setPage={setPage} setCurrentMovie={setCurrentMovie} />;
  } else if (page === 'details') {
    content = <FilmDetails movie={currentMovie} setPage={setPage} />;
  } else if (page === 'reserve') {
    content = (
      <SeatSelection
        movie={currentMovie}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
        setPage={setPage}
      />
    );
  } else if (page === 'checkout') {
    content = (
      <CheckoutPage
        movie={currentMovie}
        seats={selectedSeats}
        setPage={setPage}
        setEmailSent={setEmailSent}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={page} setPage={setPage} />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

export default App;