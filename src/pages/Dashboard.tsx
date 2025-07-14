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
      // SUPER ENHANCED animated background elements
      if (bgRef.current) {
        const circles = bgRef.current.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
          gsap.set(circle, { 
            scale: 0,
            rotation: Math.random() * 360,
            opacity: 0
          });
          
          gsap.to(circle, {
            scale: 1,
            opacity: 0.25,
            duration: 2,
            delay: index * 0.1,
            ease: "elastic.out(1, 0.3)"
          });
          
          gsap.to(circle, {
            y: "random(-120, 120)",
            x: "random(-60, 60)",
            rotation: "+=360",
            duration: "random(8, 16)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
          });
        });
      }

      // DRAMATIC header animation with 3D effects
      if (headerRef.current) {
        gsap.set(headerRef.current, {
          y: -150,
          opacity: 0,
          rotationX: -90,
          transformPerspective: 1000
        });
        
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "back.out(1.7)"
        });
      }

      // COMPLETELY OVERHAULED grid items animations
      if (gridRef.current) {
        const gridItems = gridRef.current.children;
        
        // Set initial dramatic states
        gsap.set(gridItems, { 
          y: 200, 
          opacity: 0, 
          scale: 0.3, 
          rotationX: 90,
          rotationY: 45,
          transformPerspective: 1000,
          transformOrigin: "center center"
        });
        
        // Create DRAMATIC stagger animation
        gsap.to(gridItems, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 1.5,
          stagger: {
            amount: 2,
            from: "start",
            ease: "power3.out"
          },
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              // SUPER DRAMATIC entrance effects
              gsap.to(gridItems, {
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
                duration: 1,
                stagger: 0.15,
                ease: "power2.out"
              });
              
              // Add sparkle effect
              gsap.to(gridItems, {
                filter: "brightness(1.1) saturate(1.2)",
                duration: 0.5,
                stagger: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
              });
            }
          }
        });

        // ENHANCED individual hover animations
        Array.from(gridItems).forEach((item, index) => {
          const element = item as HTMLElement;
          
          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              y: -20,
              scale: 1.05,
              rotationY: 5,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
              duration: 0.4,
              ease: "back.out(1.7)"
            });
          });
          
          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              rotationY: 0,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
        
        // Add continuous floating animation
        gsap.to(gridItems, {
          y: "random(-10, 10)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2
        });
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
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });
    
    return (
      <motion.div
        ref={ref}
        initial={{ 
          opacity: 0, 
          y: 150, 
          scale: 0.6, 
          rotateX: 90,
          rotateY: 30,
          z: -200
        }}
        animate={inView ? { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          transition: {
            type: "spring",
            damping: 20,
            stiffness: 100,
            duration: 1.2,
            delay: index * 0.2,
            ease: [0.17, 0.67, 0.83, 0.67]
          }
        } : { 
          opacity: 0, 
          y: 150, 
          scale: 0.6, 
          rotateX: 90,
          rotateY: 30,
          z: -200
        }}
        whileHover={{
          scale: 1.05,
          y: -15,
          rotateY: 5,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        className="group perspective-1000"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-4xl transition-all duration-700 border border-gray-100 group-hover:border-blue-300 overflow-hidden transform-gpu">
          <motion.div 
            className="p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-100/50"
            whileHover={{
              background: "linear-gradient(to right, rgb(219 234 254), rgb(238 242 255), rgb(243 232 255))",
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg"
                whileHover={{
                  scale: 1.2,
                  rotate: 15,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                  transition: { duration: 0.3 }
                }}
              >
                {section.icon}
              </motion.div>
              <div>
                <motion.h3 
                  className="font-black text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  {section.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 font-medium"
                  whileHover={{ x: 5, transition: { duration: 0.2 } }}
                >
                  {section.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="transform-gpu"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <Component />
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-300">
      {/* SUPER AGGRESSIVE Enhanced Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
        {/* STRONG Multi-layer Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-400" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200 via-blue-300/80 to-pink-300/70" />
        <div className="absolute inset-0 bg-gradient-to-bl from-indigo-200/90 via-purple-300/60 to-blue-400/50" />
        
        {/* SUPER VISIBLE Enhanced Animated Circles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-circle absolute rounded-full opacity-25"
            style={{
              width: `${Math.random() * 250 + 100}px`,
              height: `${Math.random() * 250 + 100}px`,
              background: `radial-gradient(circle, ${['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6', '#ef4444'][Math.floor(Math.random() * 8)]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(4px)'
            }}
          />
        ))}
        
        {/* SUPER ENHANCED Geometric Patterns */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-32 left-32 w-24 h-24 border-4 border-blue-500 rotate-45 animate-spin-slow" />
          <div className="absolute top-64 right-64 w-32 h-32 border-4 border-purple-500 rotate-12 animate-pulse" />
          <div className="absolute bottom-48 left-1/4 w-28 h-28 border-4 border-indigo-500 rotate-45 animate-bounce-slow" />
          <div className="absolute top-1/3 right-1/4 w-36 h-36 border-4 border-cyan-500 rotate-12 animate-spin-slow" />
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 border-4 border-pink-500 rotate-45 animate-pulse" />
          <div className="absolute top-1/4 left-1/2 w-20 h-20 border-4 border-green-500 rotate-12 animate-bounce-slow" />
        </div>
        
        {/* Light overlay for better readability */}
        <div className="absolute inset-0 bg-white/20" />
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