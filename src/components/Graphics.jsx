import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import DataService from '../services/DataService';

const Graphics = ({ useAPI }) => {
    const [data, setData] = useState([]); // Etat pour stocker les données de sessions 
    const [error, setError] = useState(null); // Etat pour stocker les erreurs eventuelles
    const dataService = new DataService(useAPI); // Instance du service de données

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Je récupère les données de sessions moyennes de l'utilisateur
                const sessionData = await dataService.getUserAverageSession(12);
                // Ici je me fait un tableau pour les jours de la semaine
                const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
                // Je formate les données pour afficher les jours dans le graphique
                const formattedData = sessionData.sessions.map((session) => ({
                    ...session,
                    day: days[session.day - 1],
                }));
                setData(formattedData);
            } catch (err) {
                // En cas d'erreur, j'affiche un message d'erreur
                console.error('Error fetching average sessions data:', err);
                setError('Erreur lors du chargement des données');
            }
        };
        fetchData();
    }, [dataService]); // Le tableau de dépendances inclut dataService

    if (error) {
        // Si une erreur s'est produite, j'affiche un message d'erreur sur la page
        return <p>{error}</p>;
    }

    return (
        // Ici j'importe ma bibliotheque pour mon graphique 
        <div className="average-session-chart">
            <h2 className="chart-title">Durée moyenne des sessions</h2>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: '#FFFFFF' }} />
                        <YAxis hide />
                        <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: 5, fontSize: 10, padding: '5px 10px', color: 'black' }} formatter={(value) => [`${value} min`]} labelFormatter={() => ''} cursor={{ stroke: '#E60000', strokeWidth: 2 }} />
                        <Line type="monotone" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                // Si les données ne sont pas encore chargées, j'affiche un message de chargement
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Graphics;