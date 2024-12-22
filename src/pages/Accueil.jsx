import React from 'react';
import HorizontalNavBar from '../components/HorizontalNavBar';
import VerticalNavBar from '../components/VerticalNavBar';
import UserInfo from '../components/UserInfo';
import DailyActivity from '../components/DailyActivity';
import Graphics from '../components/Graphics';
import RadarChartComponent from '../components/RadarChart';
import NutriCards from '../components/NutriCards';

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
                <Graphics />
                <RadarChartComponent />
            <div>
                <NutriCards />
            </div>
            </div>
           
        </div>
    </div>
);
};

export default Accueil;