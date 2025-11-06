"use client"

import React from 'react';
import { motion } from 'framer-motion';
import './rulesection.css';
import idbg1 from "../assets/idbg1.jpeg";
import idbg2 from "../assets/idbg2.jpeg";
import idbg3 from "../assets/idbg3.jpeg";

export default function RuleSection() {
  // Content config
  const rules = [
  {
    id: 1,
    title: "DIRECTIVE ALPHA: TEAM FORMATION",
    description: "TEAM SIZE: 2–4 OPERATIVES REQUIRED. SOLO ENTRY: DENIED. ALL PARTICIPANTS MUST BE ONLINE AND READY FOR DEPLOYMENT BY 8TH DECEMBER, 1 PM.",
    backgroundImage: idbg1.src,
    backgroundPosition: 'center top'
  },
  {
    id: 2,
    title: "DIRECTIVE BETA: MISSION INTEGRITY",
    description: "EXTERNAL HELP OR ONLINE ASSISTANCE OUTSIDE YOUR TEAM IS STRICTLY FORBIDDEN. ALL RESPONSES MUST FOLLOW THE FORMAT — EXAMPLE: IF THE QUESTION IS 'WHAT IS 2+2?', SUBMIT AS answer 4. ANY DEVIATION OR UNFAIR MEANS WILL LEAD TO DISQUALIFICATION.",
    backgroundImage: idbg2.src,
    backgroundPosition: 'center center'
  },
  {
    id: 3,
    title: "DIRECTIVE GAMMA: VICTORY PROTOCOL",
    description: "THE ONLINE MISSION BEGINS AT 1 PM ON 8TH DECEMBER. THE FASTEST TEAM TO COMPLETE ALL CHALLENGES FIRST WILL SECURE THE WIN. SPEED AND ACCURACY MAXIMIZE YOUR CHANCES OF VICTORY. SINGLE ROUND • SINGLE WINNING TEAM • PRIZE POOL ₹1000.",
    backgroundImage: idbg3.src,
    backgroundPosition: 'center bottom'
  }
];


  // Motion variants (minimal and reusable)
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
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { y: -8, scale: 1.03, transition: { duration: 0.25, ease: "easeInOut" } }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="rules-section-container">
      <div className="rules-background">
        {/* Title */}
        <motion.div 
          className="rules-title-container"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1 
            className="rules-main-title transformer-font"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
        </motion.div>

        {/* Rules Grid */}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}