import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Clock, Truck, MapPin } from 'lucide-react';
import { supplyChainData } from '../../data/mockData';

const RouteOptimization: React.FC = () => {
  const deliveryPartners = supplyChainData.routes.map((route, index) => ({
    id: index + 1,
    name: route.driver,
    eta: route.eta,
    efficiency: 90 + Math.floor(Math.random() * 10), // 90-99% efficiency
    packages: 15 + Math.floor(Math.random() * 20), // 15-35 packages
    currentLocation: route.currentLocation,
    destination: route.destination,
    route: route.route.join(' → ')
  }));

  // Add some additional mock delivery partners to show more data
  const additionalPartners = [
    { id: 3, name: 'FastTrack Express', eta: '4:00 PM', efficiency: 96, packages: 31, currentLocation: 'Warehouse C', destination: 'Store #445', route: 'Warehouse C → Zone 5 → Store #445' },
    { id: 4, name: 'QuickShip Logistics', eta: '4:45 PM', efficiency: 92, packages: 27, currentLocation: 'Warehouse D', destination: 'Store #556', route: 'Warehouse D → Zone 8 → Store #556' },
  ];

  const allDeliveryPartners = [...deliveryPartners, ...additionalPartners];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600 bg-green-100';
    if (efficiency >= 90) return 'text-blue-600 bg-blue-100';
    return 'text-orange-600 bg-orange-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Navigation className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Last-Mile Route Optimization</h3>
            <p className="text-sm text-gray-600">AI-optimized delivery routes</p>
          </div>
        </div>
      </div>

      {/* Route Map Visualization */}
      <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Optimized Route Network</p>
            <p className="text-xs text-gray-500">Real-time traffic adjustment & path optimization</p>
          </div>
        </div>
        
        {/* Animated route lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            d="M 50 150 Q 100 50 200 100 T 350 80"
            stroke="#10B981"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M 80 170 Q 150 80 250 120 T 380 100"
            stroke="#0071CE"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </svg>

        {/* Delivery points */}
        {[1, 2, 3, 4].map((point, index) => (
          <motion.div
            key={point}
            className="absolute"
            style={{
              left: `${20 + index * 20}%`,
              top: `${60 + (index % 2) * 20}%`
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3
            }}
          >
            <div className="bg-white p-1 rounded-full shadow-lg">
              <MapPin className="h-3 w-3 text-red-500" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delivery Partners Table */}
      <div className="space-y-3">
        {allDeliveryPartners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            title={`Route: ${partner.route}`}
          >
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <span className="font-medium text-gray-900">{partner.name}</span>
                <div className="text-sm text-gray-600">{partner.packages} packages • {partner.currentLocation}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {partner.eta}
                </div>
                <div className="text-xs text-gray-500">{partner.destination}</div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(partner.efficiency)}`}>
                {partner.efficiency}% Efficient
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">-30%</div>
          <div className="text-xs text-gray-500">Delivery Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">93%</div>
          <div className="text-xs text-gray-500">On-time Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{allDeliveryPartners.reduce((sum, p) => sum + p.packages, 0)}</div>
          <div className="text-xs text-gray-500">Daily Deliveries</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RouteOptimization;