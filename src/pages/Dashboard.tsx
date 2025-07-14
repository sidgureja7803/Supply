import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Thermometer, 
  Route, 
  Warehouse, 
  Leaf, 
  Shield,
  Activity,
  Sparkles,
  Zap
} from 'lucide-react';
import DemandForecast from '../components/dashboard/DemandForecast';
import InventoryManagement from '../components/dashboard/InventoryManagement';
import DynamicPricing from '../components/dashboard/DynamicPricing';
import ColdChainMonitoring from '../components/dashboard/ColdChainMonitoring';
import RouteOptimization from '../components/dashboard/RouteOptimization';
import SmartWarehouse from '../components/dashboard/SmartWarehouse';
import CarbonTracker from '../components/dashboard/CarbonTracker';
import ShrinkageDetection from '../components/dashboard/ShrinkageDetection';

gsap.registerPlugin(ScrollTrigger);

const Dashboard: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background elements
      if (bgRef.current) {
        const circles = bgRef.current.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
          gsap.to(circle, {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            rotation: 360,
            duration: "random(15, 25)",
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: index * 0.3
          });
        });
      }

      // Header animation
      gsap.from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Grid items stagger animation
      if (gridRef.current) {
        const gridItems = gridRef.current.children;
        gsap.fromTo(gridItems, 
          { y: 100, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const dashboardMetrics = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      icon: <DollarSign className="h-8 w-8" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Active Orders",
      value: "1,247",
      change: "+8.2%",
      icon: <Package className="h-8 w-8" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Efficiency Score",
      value: "94.8%",
      change: "+2.1%",
      icon: <TrendingUp className="h-8 w-8" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "System Health",
      value: "99.2%",
      change: "+0.5%",
      icon: <Activity className="h-8 w-8" />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const dashboardSections = [
    {
      component: DemandForecast,
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Demand Forecast",
      description: "AI-powered demand prediction with 95% accuracy"
    },
    {
      component: InventoryManagement,
      icon: <Package className="h-6 w-6" />,
      title: "Inventory Management",
      description: "Real-time stock monitoring and optimization"
    },
    {
      component: DynamicPricing,
      icon: <DollarSign className="h-6 w-6" />,
      title: "Dynamic Pricing",
      description: "Smart pricing optimization algorithms"
    },
    {
      component: ColdChainMonitoring,
      icon: <Thermometer className="h-6 w-6" />,
      title: "Cold Chain Monitoring",
      description: "Temperature tracking and quality assurance"
    },
    {
      component: RouteOptimization,
      icon: <Route className="h-6 w-6" />,
      title: "Route Optimization",
      description: "Delivery route planning and logistics"
    },
    {
      component: SmartWarehouse,
      icon: <Warehouse className="h-6 w-6" />,
      title: "Smart Warehouse",
      description: "Automated warehouse operations system"
    },
    {
      component: CarbonTracker,
      icon: <Leaf className="h-6 w-6" />,
      title: "Carbon Tracker",
      description: "Sustainability monitoring and reporting"
    },
    {
      component: ShrinkageDetection,
      icon: <Shield className="h-6 w-6" />,
      title: "Shrinkage Detection",
      description: "AI-powered loss prevention system"
    }
  ];

  const MetricCard = ({ metric, index }: { metric: any; index: number }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group cursor-pointer"
      >
        <div className={`bg-gradient-to-br ${metric.gradient} p-1 rounded-3xl group-hover:scale-105 transition-transform duration-300 shadow-xl group-hover:shadow-2xl`}>
          <div className="bg-white/95 backdrop-blur-sm p-8 rounded-3xl h-full">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${metric.gradient} text-white shadow-lg`}>
                {metric.icon}
              </div>
              <span className="text-green-600 text-sm font-black bg-green-50 px-3 py-2 rounded-xl">
                {metric.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-bold mb-2 uppercase tracking-wide">{metric.title}</h3>
            <p className="text-4xl font-black text-gray-900">{metric.value}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  const DashboardSection = ({ section, index }: { section: any; index: number }) => {
    const Component = section.component;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: (index % 2) * 0.2 }}
        viewport={{ once: true }}
        className="group"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200 group-hover:scale-105">
          <div className="p-6 bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {section.icon}
              </div>
              <div>
                <h3 className="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {section.title}
                </h3>
                <p className="text-gray-600 font-medium">{section.description}</p>
              </div>
            </div>
          </div>
          <div className="transform group-hover:scale-[1.01] transition-transform duration-300 origin-top">
            <Component />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background */}
      <div ref={bgRef} className="fixed inset-0 -z-10 pointer-events-none">
        {/* Animated Circles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="floating-circle absolute rounded-full opacity-5"
            style={{
              width: `${Math.random() * 150 + 80}px`,
              height: `${Math.random() * 150 + 80}px`,
              background: `linear-gradient(45deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-32 left-32 w-20 h-20 border border-blue-400 rotate-45 animate-spin-slow" />
          <div className="absolute top-64 right-64 w-24 h-24 border border-purple-400 rotate-12 animate-pulse" />
          <div className="absolute bottom-48 left-1/4 w-22 h-22 border border-indigo-400 rotate-45 animate-bounce-slow" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-12" style={{ marginTop: '120px' }}>
        {/* Header Section */}
        <div ref={headerRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-12 w-12 text-blue-500 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black text-gray-900">
                Supply Chain
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"> Dashboard</span>
              </h1>
              <Zap className="h-12 w-12 text-purple-500 ml-4 animate-pulse" />
            </div>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real-time insights and AI-powered optimization across all operations
            </p>
          </motion.div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {dashboardMetrics.map((metric, index) => (
              <MetricCard key={metric.title} metric={metric} index={index} />
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {dashboardSections.map((section, index) => (
            <DashboardSection key={section.title} section={section} index={index} />
          ))}
        </div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <h2 className="text-4xl font-black mb-8">System Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="text-5xl font-black mb-3 group-hover:text-cyan-300 transition-colors">99.9%</div>
              <div className="text-blue-200 font-bold text-lg">Uptime</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-5xl font-black mb-3 group-hover:text-green-300 transition-colors">2.3ms</div>
              <div className="text-blue-200 font-bold text-lg">Response Time</div>
            </div>
            <div className="group cursor-pointer">
              <div className="text-5xl font-black mb-3 group-hover:text-yellow-300 transition-colors">1M+</div>
              <div className="text-blue-200 font-bold text-lg">Data Points/Day</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;