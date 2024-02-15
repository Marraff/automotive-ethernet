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
