import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Package, Navigation } from 'lucide-react';

const SmartWarehouse: React.FC = () => {
  const pickingPath = [
    { zone: 'Zone C', shelf: 12, product: '3456', status: 'current' },
    { zone: 'Zone D', shelf: 8, product: '7890', status: 'next' },
    { zone: 'Zone A', shelf: 25, product: '1234', status: 'pending' },
    { zone: 'Zone B', shelf: 19, product: '5678', status: 'pending' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'text-green-600 bg-green-100';
      case 'next': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-100 p-2 rounded-lg">
            <Eye className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Smart Warehouse AR Co-Pilot</h3>
            <p className="text-sm text-gray-600">Augmented reality picking guidance</p>
          </div>
        </div>
      </div>

      {/* AR Glasses Visualization */}
      <div className="h-48 bg-gradient-to-br from-orange-50 to-purple-50 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-white p-4 rounded-lg shadow-lg mx-auto mb-4"
              style={{ width: 'fit-content' }}
            >
              <Eye className="h-16 w-16 text-orange-600 mx-auto" />
            </motion.div>
            <p className="text-sm text-gray-600 font-medium">AR Glasses Interface</p>
            <p className="text-xs text-gray-500">Real-time picking instructions</p>
          </div>
        </div>

        {/* Overlay AR elements */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg">
          <div className="text-xs font-medium text-orange-600">CURRENT TASK</div>
          <div className="text-sm font-bold text-gray-900">Pick Path Active</div>
        </div>

        <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg">
          <div className="text-xs font-medium text-green-600">EFFICIENCY</div>
          <div className="text-sm font-bold text-gray-900">+25% Faster</div>
        </div>
      </div>

      {/* Current Pick Path */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Navigation className="h-5 w-5 text-orange-600" />
          <span className="font-medium text-gray-900">Current Pick Path:</span>
          <span className="text-orange-600 font-mono text-sm">
            Zone C ➝ Shelf 12 ➝ Product ID: 3456
          </span>
        </div>
      </div>

      {/* Picking Queue */}
      <div className="space-y-3">
        {pickingPath.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-gray-600" />
              <div>
                <span className="font-medium text-gray-900">{item.zone}</span>
                <div className="text-sm text-gray-600">
                  Shelf {item.shelf} • Product #{item.product}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {item.status === 'current' && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4 text-green-600" />
                </motion.div>
              )}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                {item.status === 'current' ? 'In Progress' : 
                 item.status === 'next' ? 'Next' : 'Queued'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">45</div>
          <div className="text-xs text-gray-500">Picks/Hour</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">99.2%</div>
          <div className="text-xs text-gray-500">Accuracy Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">12</div>
          <div className="text-xs text-gray-500">Active Workers</div>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartWarehouse;