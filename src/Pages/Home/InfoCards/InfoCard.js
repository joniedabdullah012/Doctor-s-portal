import React from 'react';

const InfoCard = ({ card }) => {
    const { name, description, icon, bgClass } = card;
    return (
        <div className={`p-6 text-white mt-8 card md:card-side ${bgClass} shadow-xl`}>
            <figure><img src={icon} alt="Movie" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name} </h2>
                <p>{description}</p>

            </div>
        </div>
    );
};

export default InfoCard;