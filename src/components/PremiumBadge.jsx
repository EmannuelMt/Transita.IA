import React from 'react';
import './PremiumBadge.css';

const PremiumBadge = ({ text, color = 'blue' }) => {
  const colorClasses = {
    orange: 'premium-badge-orange',
    purple: 'premium-badge-purple',
    blue: 'premium-badge-blue',
    green: 'premium-badge-green'
  };

  return (
    <div className={`premium-badge ${colorClasses[color] || colorClasses.blue}`}>
      <span className="premium-badge-text">{text}</span>
    </div>
  );
};

export default PremiumBadge;