import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import activityData from '../mocks/activity.json';

const DailyActivity = () => {
    const [data, setData] = useState([]);

    // Charge les données mockées au chargement du composant
    useEffect(() => {
        setData(activityData.sessions); // A Adapter selon la structure réelle de mon fichier JSON que j'aurai en back end
    }, []);

    return (
        <div className="activity-chart">
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                        data={data} 
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                        barGap={8}
                        barCategoryGap="30%"
                    >
                        {/* Axe X avec formatage des jours */}
                        <XAxis 
                            dataKey="day" 
                            tickFormatter={(day) => day.slice(-1)} // Affiche uniquement le dernier chiffre du jour
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
                        <YAxis 
                            yAxisId="calories" 
                            hide 
                        />
                        
                        {/* Tooltip */}
                        <Tooltip 
                            contentStyle={{ backgroundColor: "#E60000", color: "white", borderRadius: 5 }}
                            itemStyle={{ color: "white", fontSize: 12 }}
                            formatter={(value, name) => {
                                if (name === "kilogram") return [`${value} kg`, "Poids"];
                                if (name === "calories") return [`${value} kCal`, "Calories brûlées"];
                                return value;
                            }}
                        />
                        
                        {/* Légende personnalisée */}
                        <Legend 
                            verticalAlign="top" 
                            align="right" 
                            iconType="circle" 
                            wrapperStyle={{ top: 10, right: 20, fontSize: 12, color: '#74798C' }}
                            formatter={(value) => {
                                if (value === "kilogram") return "Poids (kg)";
                                if (value === "calories") return "Calories brûlées (kCal)";
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
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default DailyActivity;
