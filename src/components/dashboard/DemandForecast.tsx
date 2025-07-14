import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Brain } from 'lucide-react';
import { supplyChainData } from '../../data/mockData';

const DemandForecast: React.FC = () => {
  // Generate forecast data based on real products
  const generateForecastData = () => {
    const products = supplyChainData.products;
    const totalCurrentDemand = products.reduce((sum, p) => sum + p.currentStock, 0);
    const totalPredictedDemand = products.reduce((sum, p) => sum + p.predictedDemandNextWeek, 0);
    
    return [
      { name: 'Week 1', actual: totalCurrentDemand * 0.8, predicted: totalCurrentDemand * 0.82 },
      { name: 'Week 2', actual: totalCurrentDemand * 0.9, predicted: totalCurrentDemand * 0.92 },
      { name: 'Week 3', actual: totalCurrentDemand * 0.85, predicted: totalCurrentDemand * 0.87 },
      { name: 'Week 4', actual: totalCurrentDemand * 0.95, predicted: totalCurrentDemand * 0.97 },
      { name: 'Week 5', actual: totalCurrentDemand, predicted: totalCurrentDemand * 1.02 },
      { name: 'Week 6', actual: totalCurrentDemand * 1.1, predicted: totalCurrentDemand * 1.12 },
      { name: 'Week 7', actual: null, predicted: totalPredictedDemand },
      { name: 'Week 8', actual: null, predicted: totalPredictedDemand * 1.15 },
    ];
  };

  const data = generateForecastData();
  const nextWeekForecast = supplyChainData.products.reduce((sum, p) => sum + p.predictedDemandNextWeek, 0);
  const currentWeek = supplyChainData.products.reduce((sum, p) => sum + p.currentStock, 0);
  const growthRate = Math.round(((nextWeekForecast - currentWeek) / currentWeek) * 100);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className={`text-sm ${entry.color === '#0071CE' ? 'text-blue-600' : 'text-green-600'}`}>
              {entry.name === 'predicted' ? 'Predicted' : 'Actual'}: {entry.value?.toLocaleString()}
            </p>
          ))}
          {label === 'Week 7' && (
            <p className="text-xs text-orange-600 mt-1">
              Predicted spike for Smart LED TV in North region next week
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">AI Demand Forecasting</h3>
            <p className="text-sm text-gray-600">Machine learning predictions across regions</p>
          </div>
        </div>
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">95% Accuracy</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#0071CE" 
              strokeWidth={3}
              dot={{ fill: '#0071CE', strokeWidth: 2, r: 4 }}
              name="actual"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#10B981" 
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{Math.round(nextWeekForecast).toLocaleString()}</div>
          <div className="text-xs text-gray-500">Next Week Forecast</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{growthRate > 0 ? '+' : ''}{growthRate}%</div>
          <div className="text-xs text-gray-500">Growth Predicted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">North</div>
          <div className="text-xs text-gray-500">High Demand Area</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemandForecast;