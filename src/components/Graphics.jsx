import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// On importe la fonction pour récupérer les sessions moyennes depuis l'API
import { getUserAverageSession } from '../services/api';

const Graphics = () => {
    // État local pour stocker les données
    const [data, setData] = useState([]);
    // État local pour gérer une éventuelle erreur
    const [error, setError] = useState(null);

    useEffect(() => {
        // On récupère et formate les données au montage du composant
        const fetchData = async () => {
            try {
                const sessionData = await getUserAverageSession(12);
                const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
                // On remplace le numéro du jour par la lettre correspondante
                const formattedData = sessionData.sessions.map((session) => ({
                    ...session,
                    day: days[session.day - 1],
                }));
                setData(formattedData);
            } catch (err) {
                console.error('Error fetching average sessions data:', err);
                setError('Erreur lors du chargement des données');
            }
        };
        fetchData();
    }, []);

    // Affiche l’erreur si elle existe
    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="average-session-chart">
            <h2 className="chart-title">Durée moyenne des sessions</h2>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                        {/* Axe X : Jours */}
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: '#FFFFFF' }}
                        />
                        {/* Axe Y (caché) */}
                        <YAxis hide />
                        {/* Tooltip */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: 5,
                                fontSize: 10,
                                padding: '5px 10px',
                                color: 'black'
                            }}
                            formatter={(value) => [`${value} min`]}
                            labelFormatter={() => ''}
                            cursor={{ stroke: '#E60000', strokeWidth: 2 }}
                        />
                        {/* Ligne représentant la durée moyenne */}
                        <Line
                            type="monotone"
                            dataKey="sessionLength"
                            stroke="#FFFFFF"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Graphics;