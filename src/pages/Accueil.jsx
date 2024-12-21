import React from 'react';
import HorizontalNavBar from '../components/HorizontalNavBar';
import VerticalNavBar from '../components/VerticalNavBar';
import UserInfo from '../components/UserInfo';
import DailyActivity from '../components/DailyActivity';
import Graphics from '../components/Graphics';

const Accueil = () => {
    return (
        <div className="main-layout">
        {/* Barre de navigation horizontale */}
        <HorizontalNavBar />

        <div className="main-content">
            {/* Barre de navigation verticale */}
            <VerticalNavBar />

            {/* Section dashboard : pour les graphiques et les données utilisateur */}
            <div className="dashboard">
                {/* Ici, je vais pouvoir ajouter mes composants graphiques */}
                <UserInfo />
                <DailyActivity />
            </div>
            <div className='linechart'>
               <Graphics />
            </div>
        </div>
    </div>
);
};

export default Accueil;