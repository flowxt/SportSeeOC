import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useFetchData from '../hooks/useFetchData';

const Graphics = ({ useAPI, userId }) => {
    const { data, error } = useFetchData(useAPI, userId, async (dataService, userId) => {
        const sessionData = await dataService.getUserAverageSession(userId);
        const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        return sessionData.map((session) => ({
            ...session,
            day: days[session.day - 1],
        }));
    });

    if (error) {
        return <p>{error}</p>;
    }

    return (
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
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default Graphics;