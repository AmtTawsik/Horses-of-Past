import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../Pages/Dashboard/DashboardHeader';
import Footer from '../Pages/Shared/Footer';

const DashboardLayout = () => {
    return (
        <div>
            <DashboardHeader></DashboardHeader>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;