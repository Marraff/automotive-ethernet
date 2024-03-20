//import React from 'react';
import NavBar from '../../components/Navigationbar.js';
import ArticleCards from '../../components/ArticleCards.js';
import VideoCards from '../../components/VideoCards.js';
import WelcomeCard from '../../components/WelcomeCard.js';
import '../../App.css';

const Dashboard = () => {
	

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
               <WelcomeCard />
            </div>
            <div>
                <ArticleCards />
            </div>
            <div>
                <VideoCards />
            </div>
        </div>
    
      );
};

export default Dashboard;