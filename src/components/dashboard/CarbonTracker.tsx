import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, TrendingDown, Award } from 'lucide-react';
import { supplyChainData } from '../../data/mockData';

const CarbonTracker: React.FC = () => {
  const [currentSavings, setCurrentSavings] = useState(parseFloat(supplyChainData.carbonFootprint.dailySavedCO2.replace(' kg', '')));
  const weeklyGoal = parseInt(supplyChainData.carbonFootprint.weeklyGoalAchieved.replace('%', ''));

  const weeklyData = [
    { day: 'Mon', emissions: 45.2, saved: 12.8 },
    { day: 'Tue', emissions: 42.1, saved: 15.2 },
    { day: 'Wed', emissions: 38.9, saved: 18.4 },
    { day: 'Thu', emissions: 41.3, saved: 16.1 },
    { day: 'Fri', emissions: 37.5, saved: 19.8 },
    { day: 'Sat', emissions: 35.2, saved: 22.1 },
    { day: 'Today', emissions: 33.8, saved: currentSavings },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSavings(prev => Math.round((prev + Math.random() * 0.5) * 10) / 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-red-600">Emissions: {payload[0]?.value} kg CO₂</p>
          <p className="text-sm text-green-600">Saved: {payload[1]?.value} kg CO₂</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Carbon Emission Tracker</h3>
            <p className="text-sm text-gray-600">Sustainability monitoring & optimization</p>
          </div>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">-15% This Month</span>
        </div>
      </div>

      {/* Current Savings Display */}
      <div className="text-center mb-6">
        <motion.div
          key={currentSavings}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="inline-block"
        >
          <div className="text-4xl font-bold text-green-600 mb-2">
            {currentSavings} kg
          </div>
          <div className="text-lg text-gray-700 mb-1">Today's CO₂ Saved</div>
          <div className="text-sm text-gray-500">Through route optimization & efficiency</div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Daily Goal: 20 kg CO₂</span>
          <span>{Math.round((currentSavings / 20) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((currentSavings / 20) * 100, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="emissions" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 3 }}
              name="emissions"
            />
            <Line 
              type="monotone" 
              dataKey="saved" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="saved"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Award className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="text-2xl font-bold text-green-600">{weeklyGoal}%</div>
          <div className="text-xs text-gray-500">Eco Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{Math.round(currentSavings * 17.4)}</div>
          <div className="text-xs text-gray-500">Trees Equivalent</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">1.2T</div>
          <div className="text-xs text-gray-500">Monthly Reduction</div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarbonTracker;