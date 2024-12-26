import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getUserActivityById } from '../services/api';

const DailyActivity = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const userId = 12; // ID utilisateur fixe

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activityData = await getUserActivityById(userId);
                // Conserver uniquement les 10 derniers jours
                const last10Days = activityData.sessions.slice(-10);
                setData(last10Days);
            } catch (err) {
                console.error('Error fetching activity data:', err);
                setError('Erreur lors du chargement des données');
            }
        };

        fetchData();
    }, [userId]);

    if (error) {
        return <p>{error}</p>;
    }

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
                                color: '#FFFFFF',
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
                <p>Chargement des données...</p>
            )}
        </div>
    );
};

export default DailyActivity;

// Si on veut 10j sur le graphique 
// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
// import { getUserActivityById } from '../services/api';

// const DailyActivity = () => {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);
//     const userId = 12; // ID utilisateur fixe

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const activityData = await getUserActivityById(userId);

//                 // On récupère la portion voulue (jusqu’à 10 jours)
//                 let last10Days = activityData.sessions.slice(-10);
                
//                 // Vérifie si on a moins de 10 jours
//                 if (last10Days.length < 10) {
//                     // On complète avec des jours fictifs
//                     const missing = 10 - last10Days.length;
//                     for (let i = 1; i <= missing; i++) {
//                         last10Days.push({
//                             day: `Fake${i}`,
//                             kilogram: 0,
//                             calories: 0
//                         });
//                     }
//                 }
//                 setData(last10Days);
//             } catch (err) {
//                 console.error('Error fetching activity data:', err);
//                 setError('Erreur lors du chargement des données');
//             }
//         };

//         fetchData();
//     }, [userId]);

//     if (error) {
//         return <p>{error}</p>;
//     }

//     return (
//         <div className="activity-chart">
//             {data.length > 0 ? (
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart
//                         data={data}
//                         margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
//                         barGap={8}
//                         barCategoryGap="30%"
//                     >
//                         <XAxis
//                             dataKey="day"
//                             // On n’affiche que l’index +1 ou la fin du texte .slice(-1), selon vos besoins
//                             tickFormatter={(value, index) => index + 1}
//                             tickLine={false}
//                             tick={{ fontSize: 12 }}
//                             stroke="#9B9EAC"
//                         />
//                         <YAxis
//                             yAxisId="kg"
//                             orientation="right"
//                             axisLine={false}
//                             tickLine={false}
//                             tick={{ fontSize: 12, fill: '#9B9EAC' }}
//                         />
//                         <YAxis yAxisId="calories" hide />

//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: '#E60000',
//                                 border: 'none',
//                                 padding: '10px',
//                                 textAlign: 'center'
//                             }}
//                             itemStyle={{
//                                 color: '#FFFFFF',
//                                 fontSize: '12px',
//                                 padding: '5px 0',
//                                 display: 'block'
//                             }}
//                             formatter={(value, name) => {
//                                 if (name === 'kilogram') return [`${value} kg`, ''];
//                                 if (name === 'calories') return [`${value} Kcal`, ''];
//                                 return [value];
//                             }}
//                             labelFormatter={() => ''}
//                             separator=""
//                         />
//                         <Legend
//                             verticalAlign="top"
//                             align="right"
//                             iconType="circle"
//                             wrapperStyle={{ top: 10, right: 20, fontSize: 12, color: '#74798C' }}
//                             formatter={(value) => {
//                                 if (value === 'kilogram') return 'Poids (kg)';
//                                 if (value === 'calories') return 'Calories brûlées (kCal)';
//                                 return value;
//                             }}
//                         />
//                         <Bar
//                             yAxisId="kg"
//                             dataKey="kilogram"
//                             fill="#282D30"
//                             barSize={7}
//                             radius={[10, 10, 0, 0]}
//                         />
//                         <Bar
//                             yAxisId="calories"
//                             dataKey="calories"
//                             fill="#E60000"
//                             barSize={7}
//                             radius={[10, 10, 0, 0]}
//                         />
//                     </BarChart>
//                 </ResponsiveContainer>
//             ) : (
//                 <p>Chargement des données...</p>
//             )}
//         </div>
//     );
// };

// export default DailyActivity;