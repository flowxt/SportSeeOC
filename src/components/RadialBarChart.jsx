import React, { useEffect, useState } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import DataService from '../services/DataService';

const RadialBarChartComponent = ({ useAPI }) => {
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);
    const dataService = new DataService(useAPI);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await dataService.getUserById(12);
                setScore(userData.todayScore);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [dataService]);

    const data = [
        {
            name: 'Score',
            value: score * 100,
            fill: '#E60000',
        },
    ];

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="radial-bar-chart">
            <h3 className="chart-title">Score</h3>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="70%"
                    outerRadius="80%"
                    barSize={10}
                    data={data}
                    startAngle={90}
                    endAngle={450}
                >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                        background
                        clockWise
                        dataKey="value"
                        cornerRadius={10}
                    />
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="progress-label"
                        fill="#000000"
                    >
                        <tspan fontSize="24" fontWeight="bold">{`${score * 100}%`}</tspan>
                        <tspan fontSize="16" fill="#74798C" x="50%" dy="1.2em">de votre objectif</tspan>
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadialBarChartComponent;