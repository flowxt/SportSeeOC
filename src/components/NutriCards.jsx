import React, { useState, useEffect } from 'react';
import NutriCard from './NutriCard';
import caloriesIcon from '../assets/calories-icon.png';
import proteinIcon from '../assets/protein-icon.png';
import carbsIcon from '../assets/carbs-icon.png';
import fatIcon from '../assets/fat-icon.png';
import DataService from '../services/DataService';

const NutriCards = ({ useAPI, userId }) => {
    const [keyData, setKeyData] = useState({});
    const [error, setError] = useState(null);
    const dataService = new DataService(useAPI);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await dataService.getUserById(userId);
                setKeyData(userData.keyData);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService, userId]);

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