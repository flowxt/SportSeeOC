import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DataService from '../services/DataService';

const DailyActivity = ({ useAPI }) => {
    const [data, setData] = useState([]); //Etat pour stocker les données d'activité
    const [error, setError] = useState(null); //Etat pour stocker les erreurs eventuelles
    const userId = 12; // ID utilisateur fixe
    const dataService = new DataService(useAPI); // Instance du service de données

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Je récupère les données d'activité de l'utilisateur
                const activityData = await dataService.getUserActivityById(userId);
                // Je prends les 10 derniers jours d'activité
                const last10Days = activityData.sessions.slice(-10);
                setData(last10Days);
            } catch (err) {
                // En cas d'erreur, j'affiche un message d'erreur
                console.error('Error fetching activity data:', err);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService, userId]); // Le tableau de dépendances inclut dataService et userId

    if (error) {
        // Si une erreur s'est produite, j'affiche un message d'erreur sur la page
        return <p>{error}</p>;
    }

    return (

        // Ici j'importe ma bibliotheque de Recharts pour afficher les données d'activité
        <div className="activity-chart">
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                        barGap={8}
                        barCategoryGap="30%"
                    >
                        {/* Axe X : affiche la dernière lettre/chiffre du champ "day" */}
                        <XAxis
                            dataKey="day"
                            tickFormatter={(day) => day.slice(-1)}
                            tickLine={false}
                            tick={{ fontSize: 12 }}
                            stroke="#9B9EAC"
                        />
                        {/* Axe Y Poids */}
                        <YAxis
                            yAxisId="kg"
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#9B9EAC' }}
                        />
                        {/* Axe Y Calories (masqué) */}
                        <YAxis yAxisId="calories" hide />

                        {/* Infobulle Personnalisée */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: 'none',
                                padding: '10px',
                                textAlign: 'center'
                            }}
                            itemStyle={{
                                color: '#000000',
                                fontSize: '12px',
                                padding: '5px 0',
                                display: 'block'
                            }}
                            formatter={(value, name) => {
                                if (name === 'kilogram') return [`${value} kg`, ''];
                                if (name === 'calories') return [`${value} Kcal`, ''];
                                return [value];
                            }}
                            labelFormatter={() => ''}
                            separator=""
                        />

                        {/* Légende Personnalisée */}
                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ top: 10, right: 20, fontSize: 12, color: '#74798C' }}
                            formatter={(value) => {
                                if (value === 'kilogram') return 'Poids (kg)';
                                if (value === 'calories') return 'Calories brûlées (kCal)';
                                return value;
                            }}
                        />

                        {/* Barres */}
                        <Bar
                            yAxisId="kg"
                            dataKey="kilogram"
                            fill="#282D30"
                            barSize={7}
                            radius={[10, 10, 0, 0]}
                        />
                        <Bar
                            yAxisId="calories"
                            dataKey="calories"
                            fill="#E60000"
                            barSize={7}
                            radius={[10, 10, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                // J'affiche un message de chargement si les données ne sont pas encore chargées
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default DailyActivity;
