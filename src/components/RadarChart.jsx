import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useFetchData from '../hooks/useFetchData';

const kindMapping = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité"
};

const RadarChartComponent = ({ useAPI, userId }) => {
  const { data, error } = useFetchData(useAPI, userId, async (dataService, userId) => {
    const performanceData = await dataService.getUserPerformance(userId);
    return performanceData.map(item => ({
      value: item.value,
      kind: kindMapping[item.kind]
    })).reverse();
  });

  if (error) {
    return <p>{error}</p>;
  }

  if (data.length === 0) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="radar-chart" style={{ width: '258px', height: '263px', background: '#282D30', borderRadius: '5px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={data}>
          <PolarGrid gridType="polygon" radialLines={false} polarLines={false} />
          <PolarAngleAxis dataKey="kind" tick={{ fill: '#FFFFFF', fontSize: 12 }} tickLine={false} />
          <PolarRadiusAxis tick={false} axisLine={false} />
          <Radar dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;