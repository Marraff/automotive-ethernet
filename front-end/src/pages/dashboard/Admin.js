import React from 'react';
import NavBarloggedIn from '../../components/NavigationbarLoggedIn.js';
import ArticleCards from '../../components/ArticleCards.js';
import VideoCards from '../../components/VideoCards.js';
import WelcomeCard from '../../components/WelcomeCard.js';
import '../../App.css';
import VideosTable from '../../components/VideosTable.js';
import ArticlesTable from '../../components/ArticlesTable.js'
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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
        </div>
    
      );
};

export default Admin;