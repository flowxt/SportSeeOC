import React from 'react';
import NutriCard from './NutriCard';
import caloriesIcon from '../assets/calories-icon.png';
import proteinIcon from '../assets/protein-icon.png';
import carbsIcon from '../assets/carbs-icon.png';
import fatIcon from '../assets/fat-icon.png';
import userData from '../mocks/user.json';

const NutriCards = () => {
    const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

    return (
        <div className="nutri-cards">
            <NutriCard image={caloriesIcon} value={calorieCount} unit="kCal" label="Calories" />
            <NutriCard image={proteinIcon} value={proteinCount} unit="g" label="Protéines" />
            <NutriCard image={carbsIcon} value={carbohydrateCount} unit="g" label="Glucides" />
            <NutriCard image={fatIcon} value={lipidCount} unit="g" label="Lipides" />
        </div>
    );
};

export default NutriCards;