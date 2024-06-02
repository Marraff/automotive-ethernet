import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react'; 
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import wallpaper from '../images/math_custom-low.png';

import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Snackbar, AppBar, Toolbar } from '@mui/material';
//import { Link } from 'react-router-dom';

function GridExample() {

    const [videos, setVideos] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const videoContainerStyle = {
        //border: '1px solid #ccc',
        //borderRadius: '5px',
        //padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#1976d2',
      };
      
    const videoStyle = {
        width: '100%', // Set width to 100% to fill the container
        height: '315px', // Set a fixed height for the aspect ratio
        objectFit: 'cover',
        //borderRadius: '5px',
      };
      
    const videoNameStyle = {
        marginTop: '10px',
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
        color: 'white',
        fontSize: '20px',
      };

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
        //console.log(videos);
        		
	    }, [])

    return (
    
    <div>
        <div style={{ 
      backgroundImage: `url(${wallpaper})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'repeat-y',
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
         
        }}>

        <AppBar position="static" elevation={0}>
                <Toolbar>
                    <Typography variant="h6"  style={{ flex: 1, fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }} >
                        Videá
                    </Typography>
                </Toolbar>
            </AppBar>
      

        <Row md={2} className="g-4" style={{ alignItems: 'stretch', padding: '7% 10%' }}>
        
            {videos.map(video => (
            <Col key={video.id}>
                <div style={videoContainerStyle}>
                <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.ytb_id}`}
                    title={video.name}
                    allowFullScreen
                    style={videoStyle}
                ></iframe>
                <div style={videoNameStyle}>{video.name}</div>
                </div>
            </Col>
            ))}
           
      </Row>
    </div>

    </div>
  );
}

export default GridExample;
/*
import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';

function GridExample() {
    const [videos, setVideos] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    useEffect(() => {
        async function getVideos() {
            try {
                const resp = await axios.get('http://localhost:80/api/video.php');
                const jsonD = resp.data.split('"videos":')[1];
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setVideos(dataArray);
            } catch (error) {
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
                handleClick();
            }
        }
        getVideos();
    }, [enqueueSnackbar]);

    const videoContainerStyle = {
      padding: '10px',
      marginBottom: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
       // borderRadius: '10px',
    };

    const videoNameStyle = {
        marginTop: '10px',
        fontWeight: 'bold',
        textAlign: 'center',
    };

    return (
        <Container>
            <Grid container spacing={4} justifyContent="center" style={{ marginTop: '20px' }}>
                {videos.map((video) => (
                    <Grid key={video.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card elevation={3} style={videoContainerStyle}>
                            <CardMedia
                                component="iframe"
                                src={`https://www.youtube.com/embed/${video.ytb_id}`}
                                title={video.name}
                                allowFullScreen
                                style={{ height: '315px' }}
                            />
                            <CardContent>
                                <Typography variant="h6" style={videoNameStyle}>
                                    {video.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default GridExample;
*/