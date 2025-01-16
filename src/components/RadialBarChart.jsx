import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import useFetchData from '../hooks/useFetchData';

const RadialBarChartComponent = ({ useAPI, userId }) => {
    const { data: score, error } = useFetchData(useAPI, userId, async (dataService, userId) => {
        const userData = await dataService.getUserById(userId);
        return userData.todayScore;
    });

    const chartData = [
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
                    data={chartData}
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