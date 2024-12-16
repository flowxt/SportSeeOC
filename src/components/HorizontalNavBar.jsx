import React from 'react';
import logo from '../assets/logo.png';

const HorizontalNavBar = () => {
    return (
        <>
        <div className='container-navHorizontal'>
        <div className='logo'>
                    <img src={logo} alt="logo de SportSee"/>
                    <h1>SportSee</h1>
                </div>
        <div className='horizontal-nav-bar'>
            <ul>
                <li>Accueil</li>
                <li>Profil</li>
                <li>Réglage</li>
                <li>Communauté</li>
            </ul>
        </div>
        </div>
        </>
    );
};

export default HorizontalNavBar;