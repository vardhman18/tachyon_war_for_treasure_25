"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Flex } from 'antd';
import './sponsorsection.css';
import ashaBakeryLogo from "../assets/asha-bakery-logo.png";

// Modern Instagram Icon Component
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Location Icon
const LocationIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
  </svg>
);

// Phone Icon
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z"/>
  </svg>
);

export default function SponsorSection() {
  const sponsorInfo = {
    name: "Asha Bakery",
    logo: ashaBakeryLogo.src,
    instagram: "https://www.instagram.com/asha_bakery_guna?igsh=N3B0bnR3bHVlN2Zt",
    address: "Asha Bakery Purani Galla Mandi,Guna MP, 473001",
    contact: "+91 91711 58478 , +91 96447 88761 "
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.2 } 
    }
  };

  return (
    <section className="sponsor-section-container">
      <div className="sponsor-background">
        <motion.div 
          className="sponsor-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Sponsor Title */}
          <motion.div 
            className="sponsor-title-container"
            variants={itemVariants}
          >
            <h2 className="sponsor-title">SPONSORED BY</h2>
            <div className="sponsor-title-underline" />
          </motion.div>

          {/* Main Content - Logo & Name on Left, Details on Right */}
          <motion.div 
            className="sponsor-main-content"
            variants={itemVariants}
          >
            {/* Left Side - Logo and Name */}
            <div className="sponsor-left-section">
              <motion.div 
                className="sponsor-logo-container"
                variants={logoVariants}
                whileHover="hover"
              >
                <div className="sponsor-logo">
                  <img 
                    src={sponsorInfo.logo} 
                    alt={sponsorInfo.name}
                    className="sponsor-logo-image"
                  />
                </div>
              </motion.div>
              
              <h3 className="sponsor-name">{sponsorInfo.name}</h3>
            </div>

            {/* Right Side - Details */}
            <motion.div 
              className="sponsor-right-section"
              variants={itemVariants}
            >
              <Flex vertical gap={16} className="sponsor-details">
                <motion.div 
                  className="sponsor-detail-item"
                  variants={itemVariants}
                >
                  <span className="detail-icon"><LocationIcon /></span>
                  <span className="detail-text">{sponsorInfo.address}</span>
                </motion.div>
                
                <motion.div 
                  className="sponsor-detail-item"
                  variants={itemVariants}
                >
                  <span className="detail-icon"><PhoneIcon /></span>
                  <span className="detail-text">{sponsorInfo.contact}</span>
                </motion.div>
                
                <motion.div 
                  className="sponsor-social"
                  variants={itemVariants}
                >
                  <Button 
                    type="primary" 
                    className="instagram-button"
                    onClick={() => window.open(sponsorInfo.instagram, '_blank')}
                  >
                    Follow on <InstagramIcon />
                  </Button>
                </motion.div>
              </Flex>
            </motion.div>
          </motion.div>

          {/* Bottom decoration */}
          <motion.div 
            className="sponsor-bottom-decoration"
            variants={itemVariants}
          >
            <div className="decoration-line" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}