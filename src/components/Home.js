// src/components/Home.js
import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Recipe Sharing App!</h1>
      <p>Explore and share recipes with the community. Discover new flavors and connect with food lovers.</p>
      <button onClick={() => window.location.href = '/recipes'} className="explore-button">
        Explore Recipes
      </button>
    </div>
  );
}

export default Home;
