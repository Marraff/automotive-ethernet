import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AppService from '../services/AppService';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import ValidateToken from '../services/ValidateToken';
import { useSnackbar } from 'notistack';

import { AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function NavScrollExample() {

	const navigate = useNavigate();
	const location = useLocation();

	const [status, setStatus] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const [token,setToken] = React.useState('');
	const [articles, setArticles] = React.useState([]);
	const [videos, setVideos] = React.useState([]);

	const { enqueueSnackbar } = useSnackbar();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [articlesAnchorEl, setArticlesAnchorEl] = React.useState(null);
	const [videosAnchorEl, setVideosAnchorEl] = React.useState(null);
	const articlesOpen = Boolean(articlesAnchorEl);
	const videosOpen = Boolean(videosAnchorEl);
	const openPDF = (pdfData) => {
    const pdfURL = `data:application/pdf;base64,${pdfData}`;

    // Create a new window or tab with an embedded PDF viewer
    const newWindow = window.open();
    newWindow.document.write(`
        <iframe src="${pdfURL}" style="width: 100%; height: 100%;" frameborder="0"></iframe>
    `);
	};

	const handleArticlesClick = (event) => {
		setArticlesAnchorEl(event.currentTarget);
	};

	const handleVideosClick = (event) => {
		setVideosAnchorEl(event.currentTarget);
	};

	const handleArticlesClose = () => {
		setArticlesAnchorEl(null);
	};

	const handleVideosClose = () => {
		setVideosAnchorEl(null);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleUser = () =>{
		if(window.localStorage.user){

		navigate('/Admin',{ state: { registered: true, token: window.localStorage.accessToken } })
		}
		else{
		
		navigate('/DashBoardLoggedIn',{ state: { registered: true, token: window.localStorage.accessToken } })
		}
	};

	const loggout = () => {

		AppService.clearToken();
		if(window.localStorage.user){
		AppService.clearUser();
		}
		navigate('/');

	};

	useEffect(() => {

		if (window.localStorage.accessToken){
			//setTimeout(()=>{
				
					const axiosInstance = axios.create({
					baseURL: "http://localhost:80/api",
					timeout: 3000,
					headers: {Authorization: `bearer ${window.localStorage.accessToken}`}
					})

					async function validateToken(){
						try{
							
							const resp = await axiosInstance.post('/validate.php');
							
							if (!resp){
								navigate('/');
							}
							const user = AppService.getUser();
							
							if(user){
								navigate('/Admin', { state: { registered: true, token: window.localStorage.accessToken } });
							}
							else{
								navigate('/DashBoardLoggedIn', { state: { registered: true, token: window.localStorage.accessToken } });
							}
							
						}catch(error){
							setStatus(`$'error' ${error.message}`);
							handleClick();
						}        
					}
					validateToken();

			//},1000)
		}
		else{

			async function getArticles(){
				try {
  
				  const response = await axios.get('http://localhost:80/api/article_content.php');
				  const jsonD = response.data.split('[{')[1];
				  const str = "[{"+jsonD;
				  const dataArray = JSON.parse(str);
				  console.log(dataArray);
				  setArticles(dataArray);
  
				} catch (error) {
				  enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
				}    
			}
			getArticles();

			async function getVideos(){
			  try{
				  
				  const resp = await axios.get('http://localhost:80/api/video.php');
				  
				  const jsonD = resp.data.split('"videos":')[1]
				  const str = jsonD.substring(0, jsonD.length - 1);
				  const dataArray = JSON.parse(str);
				  setVideos(dataArray);
				  
				  
			  }catch(error){
				  setStatus(`$'error' ${error.message}`);
				  handleClick();
			  }        
			}
			getVideos();
		
		}

		
	//}, [navigate,setStatus,handleClick]);
	}, []);


	
	return (
		<AppBar position="static">
		  <Toolbar>
			<Typography variant="h6" component={Link} to="/" style={{ flex: 1, fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }} onClick={handleUser}>
			  Automotive Ethernet
			</Typography>
			<div>
  
			<Button onClick={handleArticlesClick} color="inherit" style={{ fontWeight: 'bold', marginRight: '10px' }}>
		  Články
		</Button>
		<Popover
		  open={articlesOpen}
		  anchorEl={articlesAnchorEl}
		  onClose={handleArticlesClose}
		  anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		  }}
		  transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		  }}
		>
		  <List>
			{articles.map((article) => (
			  <ListItem button key={article.id} component="a" onClick={() => openPDF(article.pdf_data)} target="_blank">
				<ListItemText primary={article.name.slice(0, -4)} />
			  </ListItem>
			))}
		  </List>
		</Popover>
  
		<Button onClick={handleVideosClick} color="inherit" style={{ fontWeight: 'bold', marginRight: '10px' }}>
		  Videá
		</Button>
		<Popover
		  open={videosOpen}
		  anchorEl={videosAnchorEl}
		  onClose={handleVideosClose}
		  anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		  }}
		  transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		  }}
		>
		   <List>
			{videos.map((video) => (
			  <ListItem button key={video.id} component="a" href={`https://www.youtube.com/watch?v=${video.ytb_id}`} target="_blank">
				<ListItemText primary={video.name} />
			  </ListItem>
			))}
		  </List>
		</Popover>
		<Button onClick={() => navigate('/login')} color="inherit" style={{ fontWeight: 'bold', marginRight: '10px' }}>
		  Prihlásenie
		</Button>
		<Button onClick={() => navigate('/register')} color="inherit" style={{ fontWeight: 'bold', marginRight: '10px' }}>
		  Registrácia
		</Button>
  
			</div>
		  </Toolbar>
		</AppBar>
	  );
	}
	
	export default NavScrollExample;
  /*


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" style={{'font-weight': 'bold'}} onClick={() => navigate('/')}>Automotive Ethernet</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', 'font-weight': 'bold' }}
            navbarScroll
            
          >
            
            <NavDropdown title="Články" id="article">
              
              <NavDropdown.Item href="#article">Článok 1</NavDropdown.Item>
              <NavDropdown.Item href="#article">Článok 2</NavDropdown.Item>
              <NavDropdown.Item href="#article">Článok 3</NavDropdown.Item>
                
            </NavDropdown>

            <NavDropdown title="Videá" id="videos">
              
              <NavDropdown.Item href="#video">Video 1</NavDropdown.Item>
              <NavDropdown.Item href="#video">Video 2</NavDropdown.Item>
              <NavDropdown.Item href="#video">Video 3</NavDropdown.Item>
                
            </NavDropdown>
           
          </Nav>

          <ButtonGroup className="mb-2" >
		  	<Button type="contained"           
                    variant="contained" 
                    sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/login')}>Prihlásenie</Button>
            <Button type="contained"           
                    variant="contained" 
                    sx={{ mt: 3, mb: 2 }} onClick={() => navigate('/register')}>Registrácia</Button>
          </ButtonGroup>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;*/