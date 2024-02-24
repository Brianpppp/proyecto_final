import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Navbar.css';
import RecipeSearch from './RecipeSearch';
import { TiHomeOutline } from "react-icons/ti";
import { BiLogOut } from "react-icons/bi";
import { PiBowlFood } from "react-icons/pi";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleNavigateToMealDiary = () => {
    navigate('/MealDiary');
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link"><TiHomeOutline size={40} /></Link>
        </li>
        <RecipeSearch/>
        {auth.currentUser && (
          <li className="nav-item">
            <button className="icon-button" onClick={handleSignOut}><BiLogOut size={40} /></button>
            <button className="icon-button" onClick={handleNavigateToMealDiary}><PiBowlFood size={40} /></button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
