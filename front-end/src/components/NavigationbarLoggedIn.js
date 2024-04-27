import Button from '@mui/material/Button';
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


function NavScrollExample() {

  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [token,setToken] = React.useState('');

  const handleClick = () => {
    setOpen(true);
    };

  const loggout = () => {

    AppService.clearToken();
    if(window.localStorage.user){
      AppService.clearUser();
    }
    navigate('/');

  };

    useEffect(() => {
        
        if (!location.state || !location.state.token) {
          navigate('/');
        }

        else{
          setTimeout(()=>{
              if(location.state && location.state.token){

                const axiosInstance = axios.create({
                  baseURL: "http://localhost:80/api",
                  timeout: 3000,
                  headers: {Authorization: `bearer ${location.state.token}`}
                })
                async function validateToken(){
                  try{
                      
                      const resp = await axiosInstance.post('/validate.php');

                      if (resp.data != 1){
                          navigate('/');
                      }
                     
                      if(!window.localStorage.user){
                        navigate('/DashBoardLoggedIn', { state: { registered: true, token: window.localStorage.accessToken } });
                        }
                      
                  }catch(error){
                      setStatus(`$'error' ${error.message}`);
                      handleClick();
                  }        
              }
                  /*async function validateToken(){
                      try{
                          
                          const resp = await axiosInstance.post('/validate.php');

                          if (resp.data != 1){
                              navigate('/');
                          }
                         
                          if(window.localStorage.user){
                            //navigate('/Admin', { state: { registered: true, token: window.localStorage.accessToken } });
                          }
                          else{
                            navigate('/DashBoardLoggedIn', { state: { registered: true, token: window.localStorage.accessToken } });
                            navigate('/DashBoardLoggedIn');
                          }
                          
                      }catch(error){
                          setStatus(`$'error' ${error.message}`);
                          handleClick();
                      }        
                  }*/
                  validateToken();
              }
              else{
                  navigate('/');
              }
          },1000)
      }
    }, [location.state,navigate,setStatus,handleClick]);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand  style={{'font-weight': 'bold'}} >Automotive Ethernet</Navbar.Brand>
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
            <Button onClick={loggout}  
                    type="contained"           
                    variant="contained" 
                    sx={{ mt: 3, mb: 2 }} >odhlásenie</Button>

          </ButtonGroup>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;