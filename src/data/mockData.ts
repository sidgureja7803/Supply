export const supplyChainData = {
  "products": [
    {
      "id": "P001",
      "name": "Smart LED TV 55\"",
      "region": "North",
      "currentStock": 120,
      "optimalStock": 150,
      "predictedDemandNextWeek": 180,
      "price": 399.99,
      "aiSuggestedPrice": 429.99
    },
    {
      "id": "P002",
      "name": "Organic Whole Milk (1L)",
      "region": "East",
      "currentStock": 320,
      "optimalStock": 300,
      "predictedDemandNextWeek": 310,
      "price": 1.49,
      "aiSuggestedPrice": 1.39
    },
    {
      "id": "P003",
      "name": "Bluetooth Earbuds",
      "region": "South",
      "currentStock": 80,
      "optimalStock": 100,
      "predictedDemandNextWeek": 120,
      "price": 19.99,
      "aiSuggestedPrice": 22.49
    },
    {
      "id": "P004",
      "name": "Reusable Water Bottle",
      "region": "West",
      "currentStock": 250,
      "optimalStock": 200,
      "predictedDemandNextWeek": 180,
      "price": 9.99,
      "aiSuggestedPrice": 8.99
    }
  ],
  "coldChain": [
    {
      "truckId": "TRK101",
      "location": "Chicago, IL",
      "temperature": 3.7,
      "destination": "Store #112",
      "eta": "12:45 PM",
      "status": "Stable"
    },
    {
      "truckId": "TRK207",
      "location": "Dallas, TX",
      "temperature": 4.2,
      "destination": "Store #405",
      "eta": "2:10 PM",
      "status": "Stable"
    }
  ],
  "routes": [
    {
      "driver": "Amit Sharma",
      "currentLocation": "Warehouse A",
      "destination": "Store #201",
      "eta": "11:30 AM",
      "route": ["Warehouse A", "Zone 3", "Store #201"]
    },
    {
      "driver": "Priya Desai",
      "currentLocation": "Warehouse B",
      "destination": "Store #314",
      "eta": "1:05 PM",
      "route": ["Warehouse B", "Zone 7", "Store #314"]
    }
  ],
  "carbonFootprint": {
    "dailySavedCO2": "14.2 kg",
    "weeklyGoalAchieved": "86%"
  },
  "shrinkageAlerts": [
    {
      "cameraId": "CCTV-04",
      "location": "Warehouse 3 - Aisle 7",
      "timestamp": "2025-07-05T10:24:32Z",
      "event": "Suspicious Movement Detected",
      "status": "Auto-Flagged by AI"
    }
  ]
};

// Helper functions for data processing
export const getInventoryStatus = (current: number, optimal: number) => {
  const ratio = current / optimal;
  if (ratio > 1.2) return 'Overstock';
  if (ratio < 0.8) return 'Reorder Soon';
  return 'Optimal';
};

export const getPriceChangePercentage = (current: number, suggested: number) => {
  return ((suggested - current) / current * 100);
};

export const getTemperatureStatus = (temp: number) => {
  if (temp > 4.5) return 'Warning';
  if (temp < 2) return 'Critical';
  return 'Optimal';
};