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
    const useAPI = true; // Je change entre cette valeur pour basculer entre API et mocks
    const userId = 12; // Je change la valeur pour basculer entre les utilisateurs (12 et 18)

    return (
        <div className="main-layout">
            <HorizontalNavBar />
            <div className="main-content">
                <VerticalNavBar />
                <div className="dashboard">
                    <UserInfo useAPI={useAPI} userId={userId} />
                    <div className="main-content-row">
                        <div className="main-content-left">
                            <DailyActivity useAPI={useAPI} userId={userId} />
                            <div className="charts">
                                <Graphics useAPI={useAPI} userId={userId} />
                                <RadarChartComponent useAPI={useAPI} userId={userId} />
                                <RadialBarChartComponent useAPI={useAPI} userId={userId} />
                            </div>
                        </div>
                        <div className="nutri-cards-column">
                            <NutriCards useAPI={useAPI} userId={userId} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;