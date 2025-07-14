import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { supplyChainData, getInventoryStatus } from '../../data/mockData';

const InventoryManagement: React.FC = () => {
  // Group products by region and calculate totals
  const regionData = supplyChainData.products.reduce((acc, product) => {
    const existing = acc.find(item => item.region === product.region);
    if (existing) {
      existing.current += product.currentStock;
      existing.optimal += product.optimalStock;
    } else {
      acc.push({
        region: product.region,
        current: product.currentStock,
        optimal: product.optimalStock,
        status: getInventoryStatus(product.currentStock, product.optimalStock)
      });
    }
    return acc;
  }, [] as any[]);

  // Update status based on totals
  const data = regionData.map(item => ({
    ...item,
    status: getInventoryStatus(item.current, item.optimal)
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'text-green-600 bg-green-100';
      case 'Overstock': return 'text-orange-600 bg-orange-100';
      case 'Reorder Soon': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Optimal': return <CheckCircle className="h-4 w-4" />;
      case 'Overstock': return <AlertTriangle className="h-4 w-4" />;
      case 'Reorder Soon': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label} Region</p>
          <p className="text-sm text-blue-600">Current: {data.current.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Optimal: {data.optimal.toLocaleString()}</p>
          <p className="text-sm text-orange-600">Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Package className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Inventory Management</h3>
            <p className="text-sm text-gray-600">Real-time stock levels across regions</p>
          </div>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="region" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="current" fill="#0071CE" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-900">{item.region}</span>
              <span className="text-sm text-gray-600">{item.current} units</span>
            </div>
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {getStatusIcon(item.status)}
              <span>{item.status}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InventoryManagement;