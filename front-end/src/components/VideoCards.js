import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import React from 'react'; 
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import axios from 'axios';
//import './VideoList.css'; 

function GridExample() {

    const [videos, setVideos] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
		setOpen(true);
	};

    useEffect(() => {

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
        console.log(videos);
        		
	}, [])

    return (
    
    <div>

        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#" style={{'font-weight': 'bold'}}>Videá</Navbar.Brand>
        </Container>
        </Navbar>

        <Row  md={2} className="g-4" style={{'align-items': 'stretch', padding: '7% 10%' }}>
        {videos.map((video) => (
        <div key={video.id} className="video-container">
           <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.ytb_id}`}
            title={video.name}
            allowFullScreen
          ></iframe>
          <h3>{video.name}</h3>
        </div>
      ))}
        </Row>
    </div>
  );
}

export default GridExample;

/*
<div>

        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#" style={{'font-weight': 'bold'}}>Videá</Navbar.Brand>
        </Container>
        </Navbar>

        <Row xs={1} md={4} className="g-4" style={{'align-items': 'stretch', padding: '7% 10%' }}>
        {Array.from({ length: 7 }).map((_, idx) => (
            <Col key={idx}>
            <Card border="success">
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </div>

*/