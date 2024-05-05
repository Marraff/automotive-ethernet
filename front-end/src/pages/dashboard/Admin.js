import React from 'react';
import NavBarloggedIn from '../../components/NavigationbarLoggedIn.js';
import '../../App.css';
import VideosTable from '../../components/VideosTable.js';
import ArticlesTable from '../../components/ArticlesTable.js';
import TestsTable from '../../components/TestsTable.js';
import math_wallpaper from '../../images/math_custom-low.png';

const Admin = () => {

    return (
        <div>
            <div>
                <NavBarloggedIn />
            </div>
            <div>
                <VideosTable />
            </div>
            <div>
                <ArticlesTable />
            </div>
            <div>
                <TestsTable />
            </div>
        </div>
        
      );
};

export default Admin;