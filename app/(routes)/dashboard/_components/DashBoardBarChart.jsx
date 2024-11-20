'use client';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashBoardBarChart = ({ budgetList }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-[300px] bg-zinc-800 animate-pulse rounded-lg" />;
  }

  return (
    <div className="rounded-lg">
      <h4 className="font-bold text-lg my-3">Activity</h4>
      <ResponsiveContainer
        width={'80%'}
        height={300}
      >
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b', 
              border: 'none',            
              color: '#f9fafb',          
            }}
            itemStyle={{
              color: '#f9fafb',          
            }}
            cursor={{
              fill: '#27272a', 
            }}
          />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#1d4ed8" />
          <Bar dataKey="amount" stackId="a" fill="#18181b" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default DashBoardBarChart;
