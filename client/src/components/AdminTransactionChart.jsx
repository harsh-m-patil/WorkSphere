import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'jan', jobs: 120, customers: 300 },
  { name: 'feb', jobs: 130, customers: 250 },
  { name: 'mar', jobs: 125, customers: 210 },
  { name: 'apr', jobs: 140, customers: 230 },
  { name: 'may', jobs: 135, customers: 180 },
  { name: 'june', jobs: 138, customers: 225 },
  { name: 'july', jobs: 141, customers: 245 },
  { name: 'aug', jobs: 150, customers: 500 },
  { name: 'sep', jobs: 132, customers: 211 },
  { name: 'oct', jobs: 128, customers: 190 },
  { name: 'nov', jobs: 146, customers: 233 },
  { name: 'dec', jobs: 155, customers: 280 },
];

export default function TransactionChart() {
  return (
    <div
      style={{ height: '500px', width: '100%' }}
      className="rounded-sm border border-gray-200 bg-white p-6"
    >
      <strong className="font-medium text-gray-700">Transaction</strong>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="jobs" fill="#0ea5e9" />
          <Bar dataKey="customers" fill="#0ea580" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
