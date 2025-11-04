"use client"

import React from 'react';
import { motion } from 'framer-motion';
import './rulesection.css';
import idbg1 from "../assets/idbg1.jpeg";
import idbg2 from "../assets/idbg2.jpeg";
import idbg3 from "../assets/idbg3.jpeg";

export default function RuleSection() {
  const [isSystemBooted, setIsSystemBooted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsSystemBooted(true), 1000);
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const rules = [
    {
      id: 1,
      title: "DIRECTIVE ALPHA: TEAM ASSEMBLY",
      description: "UNIT COMPOSITION: 2–4 AGENTS REQUIRED. SOLO OPERATORS: PROHIBITED. ALL AGENTS MUST BE PRESENT DURING DEPLOYMENT.",
      backgroundImage: idbg1.src, // card background image (ID card proportion)
      backgroundPosition: 'center top'
    },
    {
      id: 2,
      title: "DIRECTIVE BETA: OPERATIONAL INTEGRITY",
      description: "AID PROTOCOL: EXTERNAL SUPPORT FORBIDDEN. NETWORK ACCESS: STRICTLY LIMITED. BREACH = MISSION ABORT.",
      backgroundImage: idbg2.src,
      backgroundPosition: 'center center'
    },
    {
      id: 3,
      title: "DIRECTIVE GAMMA: TEMPORAL PROTOCOLS",
      description: "TIME WINDOW: ABSOLUTE. LATE SUBMISSIONS WILL BE VOID. SYNCHRONIZE TEAM TIMERS FOR OPTIMAL SUCCESS.",
      backgroundImage: idbg3.src,
      backgroundPosition: 'center bottom'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      rotateX: isMobile ? 0 : -15
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: isMobile ? -5 : -10,
      rotateY: isMobile ? 0 : 5,
      scale: isMobile ? 1.02 : 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const glitchVariants = {
    initial: { 
      textShadow: "0 0 0 #ff0000, 0 0 0 #00ff00, 0 0 0 #0000ff" 
    },
    animate: {
      textShadow: [
        "2px 0 0 #ff0000, -2px 0 0 #00ff00, 0 2px 0 #0000ff",
        "0 2px 0 #ff0000, 2px 0 0 #00ff00, -2px -2px 0 #0000ff",
        "-2px -2px 0 #ff0000, 0 -2px 0 #00ff00, 2px 2px 0 #0000ff",
        "0 0 0 #ff0000, 0 0 0 #00ff00, 0 0 0 #0000ff"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear"
      }
    }
  };

  return (
    <section className="rules-section-container">
      {/* System Boot Sequence */}
      <motion.div 
        className="boot-sequence"
        initial={{ opacity: 1 }}
        animate={{ opacity: isSystemBooted ? 0 : 1 }}
        transition={{ duration: 0.5, delay: isSystemBooted ? 0 : 0 }}
        style={{ pointerEvents: isSystemBooted ? 'none' : 'auto' }}
      >
        <div className="boot-text transformer-font">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            INITIALIZING HUNT PROTOCOLS...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            LOADING SECURITY MEASURES...
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            SYSTEM READY //
          </motion.div>
        </div>
      </motion.div>

      <div className="rules-background">
        {/* Animated Background Elements */}
        <div className="bg-particles">
          {[...Array(isMobile ? 8 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* Digital Rain Effect - Hidden on Mobile */}
        {!isMobile && (
          <div className="digital-rain">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="rain-column"
                animate={{
                  y: [-100, "100vh"]
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "linear"
                }}
                style={{
                  left: `${Math.random() * 100}%`
                }}
              >
                {[...Array(10)].map((_, j) => (
                  <span key={j} className="rain-char">
                    {Math.random() > 0.5 ? '1' : '0'}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        )}

        {/* Hexagonal Grid Background - Reduced on Mobile */}
        <div className="hex-grid">
          {[...Array(isMobile ? 4 : 8)].map((_, i) => (
            <motion.div
              key={i}
              className="hex-element"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, delay: i * 0.5 }
              }}
              style={{
                left: `${20 + (i % (isMobile ? 2 : 4)) * (isMobile ? 40 : 20)}%`,
                top: `${20 + Math.floor(i / (isMobile ? 2 : 4)) * 30}%`
              }}
            />
          ))}
        </div>

        {/* Main Title */}
        <motion.div 
          className="rules-title-container"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Data Stream Effect - Hidden on Mobile */}
          {!isMobile && (
            <div className="data-stream">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="data-line"
                  animate={{
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{
                    top: `${20 + i * 25}%`
                  }}
                />
              ))}
            </div>
          )}

          <motion.h1 
            className="rules-main-title transformer-font"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
          >
            HUNT PROTOCOLS
          </motion.h1>
          <motion.div 
            className="title-underline"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Protocol Version */}
          {/*<motion.div 
            className="protocol-version transformer-font"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
          >
            VERSION 2.5.8 // CLASSIFIED
          </motion.div>*/}
        </motion.div>

        {/* Rules Cards */}
        <motion.div 
          className="rules-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              className="rule-card"
              variants={cardVariants}
              whileHover="hover"
              style={{
                backgroundImage: `url(${rule.backgroundImage})`,
                  backgroundPosition: rule.backgroundPosition || 'center center',
                backgroundRepeat: 'no-repeat'
                }}
            >
              {/* Minimal border handled via CSS for clean look */}

              {/* Card Content */}
              <div className="card-content">
                <motion.div 
                  className="rule-number transformer-font"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2 + index * 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {rule.id.toString().padStart(2, '0')}
                </motion.div>

                <motion.h3 
                  className="rule-title transformer-font"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {rule.title}
                </motion.h3>

                <motion.p 
                  className="rule-description"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {rule.description}
                </motion.p>

                {/* Subtle divider line handled via CSS */}
              </div>

              {/* Decorative elements removed for clean, modern look */}

              {/* Floating Elements */}
              <motion.div 
                className="floating-elements"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="floating-dot"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.25
                    }}
                    style={{
                      transform: `rotate(${i * 90}deg) translateY(-30px)`
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div 
          className="bottom-decoration"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="cyber-lines"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}