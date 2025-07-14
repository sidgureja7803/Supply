import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { 
  Brain, 
  Smartphone, 
  Shield, 
  Eye, 
  Code, 
  Database,
  Award,
  Target,
  Users,
  Globe,
  Zap,
  TrendingUp,
  Sparkles,
  Cpu,
  Network
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background elements
      if (bgRef.current) {
        const circles = bgRef.current.querySelectorAll('.floating-circle');
        circles.forEach((circle, index) => {
          gsap.to(circle, {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            rotation: 360,
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: index * 0.5
          });
        });
      }

      // Hero section animation
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Stats counter animation
      if (statsRef.current) {
        const statNumbers = statsRef.current.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
          const finalValue = stat.textContent;
          const isPercentage = finalValue?.includes('%');
          const isCurrency = finalValue?.includes('$');
          const isDecimal = finalValue?.includes('.');
          
          let numericValue: number;
          if (isDecimal) {
            numericValue = parseFloat(finalValue?.replace(/[^0-9.]/g, '') || '0');
          } else {
            numericValue = parseInt(finalValue?.replace(/[^0-9]/g, '') || '0');
          }
          
          gsap.fromTo(stat, 
            { textContent: 0 },
            {
              textContent: numericValue,
              duration: 2,
              ease: "power2.out",
              snap: isDecimal ? { textContent: 0.1 } : { textContent: 1 },
              onUpdate: function() {
                let current: number;
                if (isDecimal) {
                  current = parseFloat((this.progress() * numericValue).toFixed(1));
                } else {
                  current = Math.ceil(this.progress() * numericValue);
                }
                
                if (isPercentage) {
                  stat.textContent = current + '%';
                } else if (isCurrency) {
                  stat.textContent = '$' + current + 'M';
                } else {
                  stat.textContent = current + '+';
                }
              },
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const technologies = [
    { 
      icon: <Brain className="h-12 w-12" />, 
      name: "Artificial Intelligence", 
      color: "text-blue-600",
      gradient: "from-blue-500 to-cyan-500",
      description: "Advanced ML algorithms for predictive analytics and intelligent automation"
    },
    { 
      icon: <Smartphone className="h-12 w-12" />, 
      name: "IoT Sensors", 
      color: "text-green-600",
      gradient: "from-green-500 to-emerald-500",
      description: "Real-time data collection and comprehensive monitoring systems"
    },
    { 
      icon: <Shield className="h-12 w-12" />, 
      name: "Blockchain", 
      color: "text-purple-600",
      gradient: "from-purple-500 to-pink-500",
      description: "Secure, transparent transaction tracking and supply chain verification"
    },
    { 
      icon: <Eye className="h-12 w-12" />, 
      name: "Augmented Reality", 
      color: "text-orange-600",
      gradient: "from-orange-500 to-red-500",
      description: "Enhanced warehouse operations visualization and training systems"
    },
    { 
      icon: <Code className="h-12 w-12" />, 
      name: "React + TypeScript", 
      color: "text-blue-500",
      gradient: "from-indigo-500 to-blue-500",
      description: "Modern, scalable frontend architecture with type safety"
    },
    { 
      icon: <Database className="h-12 w-12" />, 
      name: "Real-time Analytics", 
      color: "text-red-600",
      gradient: "from-red-500 to-pink-500",
      description: "Live data processing and comprehensive business insights"
    }
  ];

  const objectives = [
    {
      icon: <Target className="h-10 w-10" />,
      title: "Optimize Operations",
      description: "Reduce costs and improve efficiency across the entire supply chain with AI-driven automation and intelligent process optimization",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Brain className="h-10 w-10" />,
      title: "AI-Driven Insights",
      description: "Leverage machine learning for predictive analytics and intelligent decision-making processes that anticipate market changes",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Eye className="h-10 w-10" />,
      title: "Real-time Visibility", 
      description: "Provide complete transparency from warehouse to customer delivery with live tracking and comprehensive monitoring",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Innovation Excellence",
      description: "Showcase cutting-edge solutions for the Walmart Sparkathon challenge competition with breakthrough technology",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const teamStats = [
    { number: "95", suffix: "%", label: "Customer Satisfaction", icon: <Users className="h-10 w-10" /> },
    { number: "50", suffix: "+", label: "Global Partners", icon: <Globe className="h-10 w-10" /> },
    { number: "99.9", suffix: "%", label: "System Uptime", icon: <Zap className="h-10 w-10" /> },
    { number: "2.4", suffix: "M", label: "Revenue Impact", icon: <TrendingUp className="h-10 w-10" /> }
  ];

  const TechnologyCard = ({ tech, index }: { tech: any; index: number }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 90 }}
        transition={{ duration: 0.8, delay: index * 0.15 }}
        className="group cursor-pointer perspective-1000"
      >
        <div className={`bg-gradient-to-br ${tech.gradient} p-1 rounded-3xl group-hover:scale-105 transition-all duration-500 shadow-2xl group-hover:shadow-3xl`}>
          <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl h-full">
            <div className={`${tech.color} mb-8 flex justify-center group-hover:scale-125 transition-transform duration-500`}>
              {tech.icon}
            </div>
            <h3 className="font-black text-xl text-gray-900 mb-4 text-center group-hover:text-blue-600 transition-colors duration-300">
              {tech.name}
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              {tech.description}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  const ObjectiveCard = ({ objective, index }: { objective: any; index: number }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        className="group"
      >
        <div className={`bg-gradient-to-br ${objective.gradient} p-1 rounded-3xl group-hover:scale-105 transition-transform duration-500 shadow-xl`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 h-full">
            <div className="flex items-start space-x-8">
              <div className={`bg-gradient-to-br ${objective.gradient} p-5 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {objective.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {objective.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">{objective.description}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div ref={bgRef} className="fixed inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />
        
        {/* Animated Circles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="floating-circle absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `linear-gradient(45deg, ${['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]}, transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rotate-45 animate-spin-slow" />
          <div className="absolute top-40 right-40 w-24 h-24 border-2 border-cyan-400 rotate-12 animate-pulse" />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 border-2 border-pink-400 rotate-45 animate-bounce-slow" />
        </div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div ref={heroRef} className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center mb-8">
              <Sparkles className="h-16 w-16 text-yellow-400 mr-4 animate-pulse" />
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6">
                About 
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Supply Chain 2.0</span>
              </h1>
              <Sparkles className="h-16 w-16 text-yellow-400 ml-4 animate-pulse" />
            </div>
            <p className="text-2xl md:text-3xl text-blue-100 max-w-5xl mx-auto leading-relaxed">
              A revolutionary platform designed for the 
              <span className="font-black text-cyan-300 animate-pulse"> Walmart Sparkathon challenge</span>, 
              showcasing the future of intelligent supply chain management.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group cursor-pointer"
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-110 border border-white/20 group-hover:bg-white/20">
                  <div className="text-cyan-400 mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="stat-number text-5xl lg:text-6xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-blue-200 font-bold text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Overview */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-16 mb-24 border border-white/20"
        >
          <h2 className="text-5xl font-black text-white mb-12 text-center">
            Project 
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Overview</span>
          </h2>
          <div className="prose prose-2xl max-w-none text-blue-100 leading-relaxed">
            <p className="mb-8 text-xl">
              Walmart Supply Chain 2.0 represents the next generation of retail logistics, 
              combining <span className="font-black text-cyan-300">artificial intelligence</span>, 
              <span className="font-black text-green-300"> IoT sensors</span>, 
              <span className="font-black text-purple-300"> blockchain technology</span>, and 
              <span className="font-black text-orange-300"> augmented reality</span> to create an 
              integrated ecosystem that optimizes every aspect of the supply chain.
            </p>
            <p className="mb-8 text-xl">
              This platform addresses critical challenges in modern retail: demand 
              forecasting, inventory optimization, cold chain management, last-mile 
              delivery, sustainability tracking, and loss prevention. By leveraging 
              <span className="font-black text-indigo-300"> real-time data</span> and 
              <span className="font-black text-blue-300"> predictive analytics</span>, we enable 
              proactive decision-making that reduces costs and improves customer satisfaction.
            </p>
            <p className="text-xl">
              Developed as part of the <span className="font-black text-cyan-300">Walmart Sparkathon challenge</span>, 
              this MVP demonstrates how innovative technology can transform traditional 
              supply chain operations into a competitive advantage.
            </p>
          </div>
        </motion.section>

        {/* Objectives */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-white mb-8">
              Key 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Objectives</span>
            </h2>
            <p className="text-2xl text-blue-200 max-w-4xl mx-auto">
              Our mission is to revolutionize supply chain management through innovation and technology
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {objectives.map((objective, index) => (
              <ObjectiveCard key={objective.title} objective={objective} index={index} />
            ))}
          </div>
        </section>

        {/* Technologies Used */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-black text-white mb-8">
              Technologies 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Used</span>
            </h2>
            <p className="text-2xl text-blue-200 max-w-4xl mx-auto">
              Cutting-edge technologies powering the future of supply chain management
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {technologies.map((tech, index) => (
              <TechnologyCard key={tech.name} tech={tech} index={index} />
            ))}
          </div>
        </section>

        {/* Sparkathon Context */}
        <motion.section
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl shadow-2xl p-16 text-white text-center relative overflow-hidden border border-white/20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-8">
              <Network className="h-16 w-16 text-yellow-400 mr-4 animate-spin-slow" />
              <h2 className="text-5xl font-black">
                Walmart 
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Sparkathon Challenge</span>
              </h2>
              <Network className="h-16 w-16 text-yellow-400 ml-4 animate-spin-slow" />
            </div>
            <p className="text-2xl text-blue-100 max-w-5xl mx-auto leading-relaxed mb-12">
              This project was created for the Walmart Sparkathon, demonstrating innovative 
              solutions that can transform retail operations and improve customer experiences 
              through technology-driven supply chain optimization.
            </p>
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-12 py-6 rounded-3xl border border-yellow-400/30">
              <Award className="h-12 w-12 mr-6 text-yellow-400 animate-bounce" />
              <span className="text-2xl font-black">Innovation Excellence Award Submission</span>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;