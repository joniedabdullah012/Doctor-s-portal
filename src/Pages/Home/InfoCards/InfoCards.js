import React from 'react';
import clock from '../../../assets/icons/clock.svg';
import marker from '../../../assets/icons/marker.svg';
import phone from '../../../assets/icons/phone.svg';
import InfoCard from './InfoCard';

const InfoCards = () => {
    const carddata = [
        {
            id: 1,
            name: 'Opening Hours',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: clock,
            bgClass: 'bg-gradient-to-r from-primary to-secondary '
        },
        {
            id: 2,
            name: 'Our Location',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: marker,
            bgClass: 'bg-accent'
        },
        {
            id: 3,
            name: 'Contact Us',
            description: 'Open 9.00 am to 5.00 am everyday',
            icon: phone,
            bgClass: 'bg-gradient-to-r from-primary to-secondary '
        },
    ]
    return (
        <div className='gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                carddata.map(card => <InfoCard
                    key={card.id}
                    card={card}

                ></InfoCard>)
            }

        </div>
    );
};

export default InfoCards;