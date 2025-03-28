import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const featureVariants = {
  hiddenLeft: { opacity: 0, x: -100 },
  hiddenRight: { opacity: 0, x: 100 },
  hiddenBottom: { opacity: 0, y: 100 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1 } },
};

const StatisticCounter = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);

  const animateCounter = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  const counterVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 1
      }
    }
  };

  React.useEffect(() => {
    const duration = 2000; // 2 seconds for complete animation
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(progress * end);
      
      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <motion.div 
      className="statistic-item"
      variants={animateCounter}
      initial="initial"
      animate="animate"
    >
      <motion.span 
        className="statistic-number"
        variants={counterVariants}
      >
        {count.toLocaleString()}{suffix}
      </motion.span>
      <div className="statistic-label">
        {suffix === "+" ? "Total Crops Analyzed" : 
         suffix === "%" ? "Accuracy Rate" : 
         "Regions Covered"}
      </div>
    </motion.div>
  );
};

const App = () => {
  const [page, setPage] = useState("home");
  const [commodity, setCommodity] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const goToHome = () => {
    setPage("home");
    // Reset all selections
    setCommodity("");
    setState("");
    setDistrict("");
    setShowGraph(false);
  };

  const handleGoClick = () => {
    if (state && district && commodity) {
      setShowGraph(true);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container" onClick={goToHome} style={{ cursor: "pointer" }}>
          <img src="/images/logo.avif" alt="AgriTrendX Logo" className="logo" />
          <h1 id="app-name">AgriTrendX</h1>
        </div>
        <div className="nav-links">
          <a href="#supply" onClick={() => setPage("supply")}>Supply</a>
          <a href="#price" onClick={() => setPage("price")}>Price</a>
          <a href="#demand" onClick={() => setPage("demand")}>Demand</a>
        </div>
      </nav>

      {/* Hero Section */}
      {page === "home" && (
        <div className="hero-section" id="main">
          <motion.div 
            className="hero-content" 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1 }}
          >
            <h1 className="hero-title" id="head">Empowering Farmers with Real-Time Insights</h1>
            <p className="hero-description" id="body">
              Unlock market trends, monitor supply and demand, and make data-driven decisions with AgriTrendX.
              Your trusted companion for smarter agricultural strategies.
            </p>
            <div className="cta-container">
              <button className="cta-btn" onClick={() => setPage("supply")}>Explore Supply</button>
              <button className="cta-btn secondary" onClick={() => setPage("price")}>Explore Price</button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image" 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
          >
          </motion.div>
        </div>
      )}

      {/* Features Explanation Section */}
      {page === "home" && (
        <>
          <div className="features-explanation-section">
            <h2 className="section-title">Our Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3>Market Analysis</h3>
                <p>Get real-time insights into market trends and price movements</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3>Price Forecasting</h3>
                <p>AI-powered price predictions to help you make informed decisions</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3>Location Insights</h3>
                <p>Analyze market trends specific to your region and district</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.071 0l-.929.929a3 3 0 01-4.243 0l-.929-.929z" />
                  </svg>
                </div>
                <h3>Smart Recommendations</h3>
                <p>Receive personalized recommendations based on market analysis</p>
              </div>
            </div>
          </div>

          {/* New Statistics Section */}
          <div className="statistics-section">
  <h2 className="section-title">Our Impact</h2>
  <motion.div 
    className="statistics-container"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <div className="statistic-item">
      <StatisticCounter end={1250} suffix="+" />
      <p className="statistic-label">TOTAL DATA POINTS PROCESSED</p>
    </div>
    
    <div className="statistic-item">
      <StatisticCounter end={500} suffix="+" />
      <p className="statistic-label">MARKET TRENDS PREDICTED</p>
    </div>
    
    <div className="statistic-item">
      <StatisticCounter end={98} suffix="%" />
      <p className="statistic-label">PREDICTION ACCURACY</p>
    </div>
  </motion.div>
</div>

        </>
      )}

      {/* Feature Cards */}
      {page === "home" && (
        <div className="features-section">
          <motion.div 
            className="feature-card" 
            id="bg2" 
            onClick={() => setPage("supply")}
            initial="hiddenLeft" 
            whileInView="visible" 
            variants={featureVariants} 
            viewport={{ once: true }}
          >
            <h2>🌾 Real-time Supply Insights</h2>
            <p>Get real-time data on crop supply from various regions, helping you make informed decisions.</p>
          </motion.div>

          <motion.div 
            className="feature-card" 
            id="bg1" 
            onClick={() => setPage("demand")}
            initial="hiddenRight" 
            whileInView="visible" 
            variants={featureVariants} 
            viewport={{ once: true }}
          >
            <h2>📊 Accurate Demand Forecasting</h2>
            <p>Leverage AI-powered forecasting to predict future crop demands with precision.</p>
          </motion.div>

          <motion.div 
            className="feature-card" 
            id="bg3" 
            onClick={() => setPage("price")}
            initial="hiddenBottom" 
            whileInView="visible" 
            variants={featureVariants} 
            viewport={{ once: true }}
          >
            <h2>💰 Price Trends and Recommendations</h2>
            <p>Monitor price trends and receive recommendations for the best-selling opportunities.</p>
          </motion.div>
        </div>
      )}

      {/* Dropdown + Graph Section */}
      {page !== "home" && (
        <div className="graph-page">
          <h1>{page.charAt(0).toUpperCase() + page.slice(1)} Trends</h1>

          {/* Dropdowns */}
          <div className="dropdowns">
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">Select State</option>
              <option value="karnataka">Karnataka</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="maharashtra">Maharashtra</option>
            </select>

            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Select District</option>
              <option value="bangalore">Bangalore</option>
              <option value="chennai">Chennai</option>
              <option value="mumbai">Mumbai</option>
            </select>

            <select value={commodity} onChange={(e) => setCommodity(e.target.value)}>
              <option value="">Select Commodity</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
            </select>

            <button onClick={handleGoClick}>Search</button>
          </div>

          {/* Graph Display */}
          {showGraph && (
            <div className="graph-container">
              <h2>Graph for {commodity} in {district}, {state}</h2>
              <div className="graph-placeholder">📊 Graph goes here</div>
            </div>
          )}

          {/* Back Button */}
          <button className="cta-btn" onClick={goToHome}>Back to Home</button>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 AgriTrendX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;






