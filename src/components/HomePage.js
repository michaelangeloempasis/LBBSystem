import React from 'react';
import Header from './Header';

function HomePage() {
  return (
    <div>
      <Header />
      <div className="container home-page">
        <div className="search-bar">
          <input type="text" placeholder="Search for books, subjects, etc." />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
