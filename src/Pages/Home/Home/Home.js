import React from 'react';
import Banner from '../Banner/Banner';
import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import MakeAppointMent from '../MakeAppointMent/MakeAppointMent'
import Testomonial from '../Testominial/Testomonial';

const Home = () => {
    return (
        <div className='mx-5'>

            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeAppointMent></MakeAppointMent>
            <Testomonial></Testomonial>

        </div>
    );
};

export default Home;