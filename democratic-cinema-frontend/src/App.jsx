import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VotingPage from './pages/VotingPage';
import FilmsPage from './pages/FilmsPage';
import SchedulePage from './pages/SchedulePage';
import FilmDetails from './pages/FilmDetails';
import SeatSelection from './pages/SeatSelection';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/admin/RegisterPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';

function App() {
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
        return 'stemmen';
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
      case 'stemmen':
        return '/stemmen';
      case 'home':
      default:
        return '/';
    }
  };

  const [page, setPageState] = useState(() => pathToPage(window.location.pathname));
  const [currentMovie, setCurrentMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [emailSent, setEmailSent] = useState(false);

  const setPage = (newPage) => {
    const newPath = pageToPath(newPage);

    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }

    setPageState(newPage);
  };

  useEffect(() => {
    const handlePop = () => {
      setPageState(pathToPage(window.location.pathname));
    };

    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  let content = null;

  if (page === 'home') {
    content = <HomePage setPage={setPage} setCurrentMovie={setCurrentMovie} />;
  } else if (page === 'stemmen') {
    content = <VotingPage setPage={setPage} setCurrentMovie={setCurrentMovie} />;
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