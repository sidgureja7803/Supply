import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
import { supplyChainData } from '../../data/mockData';

const ShrinkageDetection: React.FC = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      location: supplyChainData.shrinkageAlerts[0].location,
      time: new Date(supplyChainData.shrinkageAlerts[0].timestamp).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      severity: 'high',
      status: 'active',
      event: supplyChainData.shrinkageAlerts[0].event,
      camera: supplyChainData.shrinkageAlerts[0].cameraId
    },
    { id: 2, location: 'Checkout Zone 3', time: '1:45 PM', severity: 'medium', status: 'investigating', event: 'Unusual Activity Pattern', camera: 'CCTV-12' },
    { id: 3, location: 'Electronics Section', time: '12:20 PM', severity: 'low', status: 'resolved', event: 'Motion After Hours', camera: 'CCTV-08' },
  ]);

  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="h-4 w-4" />;
      case 'investigating': return <Eye className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Shrinkage Detection</h3>
            <p className="text-sm text-gray-600">AI-powered loss prevention system</p>
          </div>
        </div>
        <div className={`flex items-center ${isScanning ? 'text-green-600' : 'text-gray-600'}`}>
          <Eye className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">
            {isScanning ? 'Scanning' : 'Standby'}
          </span>
        </div>
      </div>

      {/* CCTV Feed Mockup */}
      <div className="h-48 bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        
        {/* Static "CCTV" overlay */}
        <div className="absolute top-2 left-2 text-white text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
          LIVE • CAM 47-A
        </div>
        
        <div className="absolute top-2 right-2 text-white text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
          14:34:22
        </div>

        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.div
              animate={{ 
                opacity: isScanning ? [0.5, 1, 0.5] : 1,
                scale: isScanning ? [1, 1.05, 1] : 1
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Eye className="h-16 w-16 mx-auto mb-4" />
              <p className="text-sm">AI Surveillance Active</p>
              <p className="text-xs text-gray-300">Real-time behavioral analysis</p>
            </motion.div>
          </div>
        </div>

        {/* Detection grid overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-1 p-4">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="border border-green-500 border-opacity-30"
                animate={{ 
                  borderOpacity: isScanning ? [0.3, 0.7, 0.3] : 0.3
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
      >
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <div>
            <div className="font-medium text-red-900">{alerts[0].event}</div>
            <div className="text-sm text-red-700">
              {supplyChainData.shrinkageAlerts[0].status} • {alerts[0].camera} • {alerts[0].location}
            </div>
          </div>
          <div className="ml-auto">
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Investigate →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Recent Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            title={`${alert.camera} - ${alert.event}`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-1 rounded-full ${getStatusColor(alert.status)}`}>
                {getStatusIcon(alert.status)}
              </div>
              <div>
                <span className="font-medium text-gray-900">{alert.location}</span>
                <div className="text-sm text-gray-600">{alert.time} • {alert.camera}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                {alert.severity.toUpperCase()}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                {alert.status.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{alerts.length + 9}</div>
          <div className="text-xs text-gray-500">Active Cameras</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">98%</div>
          <div className="text-xs text-gray-500">Detection Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">-25%</div>
          <div className="text-xs text-gray-500">Shrinkage Reduction</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShrinkageDetection;