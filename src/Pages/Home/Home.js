import React from 'react';
import AboutUs from './AboutUs';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;