import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Truck, MapPin, Clock } from 'lucide-react';
import { supplyChainData, getTemperatureStatus } from '../../data/mockData';

const ColdChainMonitoring: React.FC = () => {
  const [trucks, setTrucks] = useState(
    supplyChainData.coldChain.map(truck => ({
      id: truck.truckId,
      temp: truck.temperature,
      eta: truck.eta,
      status: getTemperatureStatus(truck.temperature).toLowerCase(),
      route: `${truck.location} → ${truck.destination}`,
      location: truck.location,
      destination: truck.destination
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks =>
        prevTrucks.map(truck => ({
          ...truck,
          temp: Math.round((truck.temp + (Math.random() - 0.5) * 0.4) * 10) / 10,
          status: getTemperatureStatus(truck.temp).toLowerCase()
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    return status === 'optimal' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100';
  };

  const getTempColor = (temp: number) => {
    if (temp > 4.5) return 'text-orange-600';
    if (temp < 2) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Thermometer className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Cold Chain Monitoring</h3>
            <p className="text-sm text-gray-600">Real-time temperature tracking</p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Interactive Route Map</p>
            <p className="text-xs text-gray-500">Live truck locations with temperature data</p>
          </div>
        </div>
        
        {/* Animated truck icons */}
        {trucks.slice(0, 2).map((truck, index) => (
          <motion.div
            key={`${truck.id}-${index}`}
            className="absolute"
            style={{
              left: `${25 + index * 35}%`,
              top: `${35 + index * 20}%`
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <div className="bg-white p-2 rounded-full shadow-lg" title={`${truck.id} - ${truck.temp}°C`}>
              <Truck className="h-4 w-4 text-blue-600" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Truck List */}
      <div className="space-y-3">
        {trucks.map((truck, index) => (
          <motion.div
            key={`truck-${truck.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title={`${truck.id} – ${truck.temp}°C – ETA ${truck.eta}`}
          >
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <span className="font-medium text-gray-900">{truck.id}</span>
                <div className="text-sm text-gray-600">{truck.location}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`text-lg font-bold ${getTempColor(truck.temp)}`}>
                  {truck.temp}°C
                </div>
                <div className="text-sm text-gray-600 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {truck.eta}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(truck.status)}`}>
                {truck.status === 'optimal' ? 'Optimal' : truck.status === 'warning' ? 'Warning' : 'Critical'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">98%</div>
          <div className="text-xs text-gray-500">Temperature Compliance</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">24/7</div>
          <div className="text-xs text-gray-500">Monitoring</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{trucks.length + 43}</div>
          <div className="text-xs text-gray-500">Active Trucks</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColdChainMonitoring;