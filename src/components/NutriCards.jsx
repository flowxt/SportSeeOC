import React from 'react';
import NutriCard from './NutriCard';
import caloriesIcon from '../assets/calories-icon.png';
import proteinIcon from '../assets/protein-icon.png';
import carbsIcon from '../assets/carbs-icon.png';
import fatIcon from '../assets/fat-icon.png';
import useFetchData from '../hooks/useFetchData';

const NutriCards = ({ useAPI, userId }) => {
    const { data: keyData, error } = useFetchData(useAPI, userId, async (dataService, userId) => {
        const userData = await dataService.getUserById(userId);
        return userData.keyData;
    });

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="nutri-cards">
            {keyData && (
                <>
                    <NutriCard image={caloriesIcon} value={keyData.calorieCount} unit="kCal" label="Calories" />
                    <NutriCard image={proteinIcon} value={keyData.proteinCount} unit="g" label="Protéines" />
                    <NutriCard image={carbsIcon} value={keyData.carbohydrateCount} unit="g" label="Glucides" />
                    <NutriCard image={fatIcon} value={keyData.lipidCount} unit="g" label="Lipides" />
                </>
            )}
        </div>
    );
};

export default NutriCards;