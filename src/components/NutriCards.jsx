import React, { useState, useEffect } from 'react';
import NutriCard from './NutriCard';
import caloriesIcon from '../assets/calories-icon.png';
import proteinIcon from '../assets/protein-icon.png';
import carbsIcon from '../assets/carbs-icon.png';
import fatIcon from '../assets/fat-icon.png';
import DataService from '../services/DataService';

const NutriCards = ({ useAPI }) => {
    const [keyData, setKeyData] = useState({}); // Etat pour stocker les données nutritionnelles
    const [error, setError] = useState(null); // Etat pour stocker les erreurs eventuelles
    const dataService = new DataService(useAPI); // Instance du service de données

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Je récupère les données nutritionnelles de l'utilisateur par son ID
                const userData = await dataService.getUserById(12); // Remplacez 12 par l'ID utilisateur approprié
                console.log('User data:', userData); // Log pour vérifier les données
                setKeyData(userData.keyData);
            } catch (error) {
                // En cas d'erreur, j'affiche un message d'erreur
                console.error('Error fetching user data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService]); // Le tableau de dépendances inclut dataService

    if (error) {
        // Afficher un message d'erreur si une erreur s'est produite
        return <p>{error}</p>;
    }

    return (
        <div className="nutri-cards">
            
            {keyData && (
                <>
                {/* Affichage de la carte des calories  */}
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