import { Link } from 'react-router-dom';

import "./home.css"

export const Home = () => {
  return (
    <div className="homeContainer">
      <h1> Welcome </h1>
      <div className="homeButtons">
        <Link to="/login"><button> Login </button></Link>
        <Link to="/register"><button> Register </button></Link>
      </div>
    </div>
  );
};