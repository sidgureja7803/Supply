import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, Brain } from 'lucide-react';
import { supplyChainData, getPriceChangePercentage } from '../../data/mockData';

const DynamicPricing: React.FC = () => {
  const [products, setProducts] = useState(
    supplyChainData.products.map(product => ({
      id: product.id,
      name: product.name,
      currentPrice: product.price,
      aiSuggestedPrice: product.aiSuggestedPrice,
      change: getPriceChangePercentage(product.price, product.aiSuggestedPrice),
      trend: getPriceChangePercentage(product.price, product.aiSuggestedPrice) > 2 ? 'up' : 
             getPriceChangePercentage(product.price, product.aiSuggestedPrice) < -2 ? 'down' : 'stable'
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProducts(prevProducts => 
        prevProducts.map(product => {
          // Simulate small price fluctuations around AI suggested price
          const fluctuation = (Math.random() - 0.5) * 0.1; // ±5% fluctuation
          const newPrice = Math.max(product.aiSuggestedPrice * (1 + fluctuation), 0.01);
          const change = ((newPrice - product.currentPrice) / product.currentPrice * 100);
          
          let trend = 'stable';
          if (change > 2) trend = 'up';
          else if (change < -2) trend = 'down';
          
          return {
            ...product,
            currentPrice: newPrice,
            change: change,
            trend
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <DollarSign className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Dynamic Pricing Engine</h3>
            <p className="text-sm text-gray-600">AI-powered real-time price optimization</p>
          </div>
        </div>
        <div className="flex items-center text-purple-600">
          <Brain className="h-4 w-4 mr-1" />
          <span className="text-xs font-medium">Auto-adjusting</span>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-gray-900">{product.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${product.currentPrice.toFixed(2)}
                </div>
                <div className={`text-sm flex items-center ${getTrendColor(product.trend)}`}>
                  {getTrendIcon(product.trend)}
                  <span className="ml-1">
                    {product.change !== 0 ? `${product.change > 0 ? '+' : ''}${product.change.toFixed(1)}%` : 'Stable'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{products.length * 60}</div>
          <div className="text-xs text-gray-500">Price Updates/Hour</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">+12%</div>
          <div className="text-xs text-gray-500">Revenue Increase</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">98%</div>
          <div className="text-xs text-gray-500">Competitive Edge</div>
        </div>
      </div>
    </motion.div>
  );
};

export default DynamicPricing;