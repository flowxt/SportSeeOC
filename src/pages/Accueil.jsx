import React from 'react';
import HorizontalNavBar from '../components/HorizontalNavBar';
import VerticalNavBar from '../components/VerticalNavBar';
import UserInfo from '../components/UserInfo';
import DailyActivity from '../components/DailyActivity';
import Graphics from '../components/Graphics';
import RadarChartComponent from '../components/RadarChart';
import RadialBarChartComponent from '../components/RadialBarChart';
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
                    {/* Informations utilisateur */}
                    <UserInfo />
                    
                    {/* Activité quotidienne et cartes nutritionnelles */}
                    <div className="main-content-row">
                        <div className="main-content-left">
                            <DailyActivity />
                            <div className="charts">
                                <Graphics />
                                <RadarChartComponent />
                                <RadialBarChartComponent />
                            </div>
                        </div>
                        <div className="nutri-cards-column">
                            <NutriCards />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;