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
    const useAPI = true; // Je change entre  cette valeur pour basculer entre API et mocks

    return (
        <div className="main-layout">
            <HorizontalNavBar />
            <div className="main-content">
                <VerticalNavBar />
                <div className="dashboard">
                    <UserInfo useAPI={useAPI} />
                    <div className="main-content-row">
                        <div className="main-content-left">
                            <DailyActivity useAPI={useAPI} />
                            <div className="charts">
                                <Graphics useAPI={useAPI} />
                                <RadarChartComponent useAPI={useAPI} />
                                <RadialBarChartComponent useAPI={useAPI} />
                            </div>
                        </div>
                        <div className="nutri-cards-column">
                            <NutriCards useAPI={useAPI} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;