import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">Welcome to the Recipe Sharing App!</h1>
        <p className="home-description">
          Explore and share recipes with the community. Discover new flavors and connect with food lovers.
        </p>
        <button onClick={() => navigate('/recipes')} className="explore-button">
          Explore Recipes
        </button>
      </div>
      <div className="home-highlight-section">
        <div className="highlight" onClick={() => navigate('/discover')}>
          <div className="highlight-icon">🍴</div>
          <h3>Discover Unique Recipes</h3>
          <p>Find recipes from around the world that fit your taste and dietary needs.</p>
        </div>
        <div className="highlight" onClick={() => navigate('/share')}>
          <div className="highlight-icon">📖</div>
          <h3>Share Your Own Recipes</h3>
          <p>Contribute your favorite recipes and share them with the community.</p>
        </div>
        <div className="highlight" onClick={() => navigate('/cook-together')}>
          <div className="highlight-icon">👨‍🍳</div>
          <h3>Cook Together</h3>
          <p>Join others in virtual cooking sessions and share the joy of cooking.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
