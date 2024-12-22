import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import performanceData from '../mocks/performance.json';

const RadarChartComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const formattedData = performanceData.data.map(item => ({
            ...item,
            kind: performanceData.kind[item.kind]
        }));
        setData(formattedData);
    }, []);

    return (
        <div className="radar-chart">
            <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#FFFFFF" />
                    <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFFFFF' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 250]} tick={{ fill: '#FFFFFF' }} />
                    <Radar name="Performance" dataKey="value" stroke="#E60000" fill="#E60000" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChartComponent;