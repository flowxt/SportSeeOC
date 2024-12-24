import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import sessionData from '../mocks/average-sessions.json';

const Graphics = () => {
    const [data, setData] = useState([]);
    
    // Je charge mes données au chargement du composant
    useEffect(() => {
        // Je convertis les jours en nom de jours
        const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
        const formattedData = sessionData.sessions.map((session) => ({
            ...session,
            day: days[session.day - 1], // Remplace les numéros de jours par les lettres correspondantes
        }));
        setData(formattedData);
    }, []);
    
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
                {/* Axe Y (masqué) */}
                <YAxis hide />
                {/* Info-bulle */}
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    borderRadius: 5,
                    fontSize: 10,
                  }}
                  formatter={(value, name) => {
                    if (name === "sessionLength") {
                        return `${value} min`;
                    }
                    return value;
                  }}
                  labelFormatter={() => ''}
                  cursor={{
                    stroke: '#E60000',
                    strokeWidth: 2,
                  }}
                />
                {/* Ligne */}
                <Line
                  type="monotone"
                  dataKey="sessionLength"
                  stroke="#FFFFFF"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#FFFFFF', stroke: '#E60000', strokeWidth: 2 }}
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