import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import DataService from '../services/DataService';

const RadarChartComponent = ({ useAPI }) => {
    const [data, setData] = useState([]); // Etat pour stocker les données de performance
    const [error, setError] = useState(null); // Etat pour stocker les erreurs eventuelles
    const dataService = new DataService(useAPI); // Instance du service de données

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Je récupère les données de performance de l'utilisateur
                const performanceData = await dataService.getUserPerformance(12);
                // Formatage des données pour le graphique radar
                const formattedData = performanceData.data
                    .map(item => ({
                        value: item.value,
                        kind: performanceData.kind[item.kind]
                    }))
                    .reverse(); // Inverser l'ordre des données pour afficher dans le sens horaire
                setData(formattedData);
            } catch (error) {
                // En cas d'erreur, j'affiche un message d'erreur
                console.error('Error fetching performance data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService]); // Le tableau de dépendances inclut dataService

    if (error) {
        // Si une erreur s'est produite, j'affiche un message d'erreur sur la page
        return <p>{error}</p>;
    }

    if (data.length === 0) {
        // Si les données ne sont pas encore chargées, j'affiche un message de chargement
        return <p>Chargement...</p>;
    }

    return (
        // Ici j'importe ma bibliotheque pour mon graphique radar
        <div className="radar-chart" style={{ width: '258px', height: '263px', background: '#282D30', borderRadius: '5px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={data}>
                    <PolarGrid gridType="polygon" radialLines={false} polarLines={false} />
                    <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFFFFF', fontSize: 12 }} tickLine={false} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChartComponent;