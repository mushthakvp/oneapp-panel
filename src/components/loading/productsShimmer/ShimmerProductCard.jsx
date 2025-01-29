import React from 'react';
import './ShimmerProductCard.css';

const ShimmerProductCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-image shimmer"></div>
      <div className="shimmer-title shimmer"></div>
      <div className="shimmer-price shimmer"></div>
      <div className="shimmer-button shimmer"></div>
    </div>
  );
};

export default ShimmerProductCard;
