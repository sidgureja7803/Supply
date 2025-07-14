import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  Brain, 
  Truck, 
  BarChart3, 
  Leaf, 
  Shield, 
  Zap,
  CheckCircle,
  TrendingUp,
  Globe,
  Cpu,
  Database
} from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';
import { useInView } from 'react-intersection-observer';

gsap.registerPlugin(ScrollTrigger);

const Homepage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section entrance animation
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4");

      // Parallax effect for hero
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI-Powered Forecasting",
      description: "Predict demand with 95% accuracy using advanced machine learning algorithms and real-time market analysis",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Truck className="h-10 w-10" />,
      title: "Smart Logistics Network",
      description: "Optimize delivery routes and reduce transportation costs by 30% with AI-driven logistics optimization",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 className="h-10 w-10" />,
      title: "Real-Time Analytics",
      description: "Monitor inventory, sales, and performance across all channels with comprehensive dashboard insights",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Leaf className="h-10 w-10" />,
      title: "Sustainability Tracking",
      description: "Reduce carbon footprint by 40% with eco-friendly supply chain practices and emissions monitoring",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Blockchain Security",
      description: "Ensure transparency and prevent theft with blockchain-powered security and AI-driven anomaly detection",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Automated Operations",
      description: "Streamline warehouse operations with AR guidance, robotics integration, and automated inventory management",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "30%", label: "Cost Reduction", icon: <TrendingUp className="h-8 w-8" /> },
    { number: "95%", label: "Forecast Accuracy", icon: <Brain className="h-8 w-8" /> },
    { number: "50%", label: "Faster Delivery", icon: <Truck className="h-8 w-8" /> },
    { number: "40%", label: "CO₂ Savings", icon: <Leaf className="h-8 w-8" /> }
  ];

  const technologies = [
    { name: "Artificial Intelligence", icon: <Cpu className="h-12 w-12" />, description: "Machine learning models" },
    { name: "Blockchain", icon: <Shield className="h-12 w-12" />, description: "Secure transactions" },
    { name: "IoT Sensors", icon: <Globe className="h-12 w-12" />, description: "Real-time monitoring" },
    { name: "Big Data", icon: <Database className="h-12 w-12" />, description: "Analytics platform" }
  ];

  const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
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
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl -z-10" 
             style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
        <div className={`bg-gradient-to-br ${feature.gradient} p-0.5 rounded-2xl group-hover:scale-105 transition-transform duration-300`}>
          <div className="bg-white p-8 rounded-2xl h-full backdrop-blur-sm">
            <div className="text-white p-3 rounded-xl inline-block mb-6" 
                 style={{ background: `linear-gradient(135deg, ${feature.gradient})` }}>
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden pt-48">
        {/* Enhanced Multi-layer Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/70 via-transparent to-purple-800/60" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-800/50 to-cyan-900/40" />
        
        <ThreeBackground />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Additional animated elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-cyan-400 rotate-45 animate-spin-slow" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 border-2 border-blue-400 rotate-12 animate-pulse" />
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 border-2 border-indigo-400 rotate-45 animate-bounce-slow" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 mt-24 text-white" style={{ marginTop: '200px' }}>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                  Supply Chain
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  2.0
                </span>
              </h1>
              
              <p ref={subtitleRef} className="text-2xl md:text-3xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
                AI-powered platform transforming inventory, logistics, and delivery for the 
                <span className="text-cyan-300 font-semibold"> future of retail</span>
              </p>
              
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/dashboard"
                  className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl text-xl font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
                >
                  <span className="relative z-10 flex items-center">
                    Explore Dashboard
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <Link
                  to="/about"
                  className="px-10 py-5 border-2 border-white/30 text-white rounded-2xl text-xl font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Floating scroll indicator */}
          <div className="flex justify-center mt-20">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
              Next-Generation
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Features</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Leverage cutting-edge technology to optimize every aspect of your supply chain operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 opacity: 0.2
               }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Powered by
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> Innovation</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/5 transition-all duration-300 group-hover:scale-105">
                  <div className="text-cyan-400 mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-300 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-gray-300 text-sm">{tech.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Transform?
            </h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience the future of retail logistics with our comprehensive dashboard demo
            </p>
            <Link
              to="/dashboard"
              className="group relative inline-flex items-center px-12 py-6 bg-white text-blue-600 rounded-2xl text-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/25"
            >
              <CheckCircle className="mr-4 h-8 w-8" />
              <span>Explore Dashboard</span>
              <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;