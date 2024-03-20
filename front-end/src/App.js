import NotFound from './components/NotFound';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import useAuth from './hooks/useAuth';
import { experimentalStyled } from '@mui/material/styles';
import React from 'react';

const AppContainer = experimentalStyled('div')(() => ({
	position: 'absolute',
	top: 0,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundRepeat: 'repeat',
	width: '100%',
	height: '100%',
	overflowY: 'auto',
}));

const App = () => {
	const content = useRoutes(routes);
	const auth = useAuth();

	return <AppContainer>{auth.isInitialized ? content : <NotFound />}</AppContainer>;
};

export default App;

/*
import logo from './logo.svg';
import './App.css';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import NavBar from './components/Navigationbar.js';
import ArticleCards from './components/ArticleCards.js'
import VideoCards from './components/VideoCards.js'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import WelcomeCard from './components/WelcomeCard.js'

function App() {
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
}

export default App;
*/