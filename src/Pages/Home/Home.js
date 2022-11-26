import React from 'react';
import AboutUs from './AboutUs';
import Advertized from './Advertized';
import Banner from './Banner';
import Categories from './Categories';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Categories></Categories>
            <Advertized></Advertized>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;