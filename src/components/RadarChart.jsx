import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { getUserPerformance } from '../services/api';

const RadarChartComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const performanceData = await getUserPerformance(12);
                // Inverser l'ordre des données pour l'affichage correct
                const formattedData = performanceData.data
                    .map(item => ({
                        value: item.value,
                        kind: performanceData.kind[item.kind]
                    }))
                    .reverse();
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching performance data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    // Vérifier si les données sont disponibles
    if (data.length === 0) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="radar-chart" style={{ width: '258px', height: '263px', background: '#282D30', borderRadius: '5px' }}>
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="70%" data={data}>
                <PolarGrid 
                    gridType="polygon"
                    radialLines={false}
                    polarLines={false}
                />
                <PolarAngleAxis 
                    dataKey="kind" 
                    tick={{ fill: '#FFFFFF', fontSize: 12 }}
                    tickLine={false}
                />
                <PolarRadiusAxis tick={false} axisLine={false} />
                <Radar 
                    dataKey="value" 
                    stroke="#FF0101" 
                    fill="#FF0101" 
                    fillOpacity={0.7}
                />
            </RadarChart>
        </ResponsiveContainer>
    </div>
    );
};

export default RadarChartComponent;