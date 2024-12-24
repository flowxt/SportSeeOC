import React from 'react';

const NutriCard = ({ image, value, unit, label }) => {
    return (
        <div className="nutri-card">
            <img src={image} alt={label} className="nutri-card-image" />
            <div className="nutri-card-content">
                <h3>{value}{unit}</h3>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default NutriCard;
