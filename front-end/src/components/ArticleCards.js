
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import React from 'react'; 
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Snackbar, AppBar, Toolbar } from '@mui/material';
//import { Link } from 'react-router-dom';

import wallpaper from '../images/background_main.jpg';
import Link from '@mui/material/Link'

function GridExample() {

    const [articles, setArticles] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState([]);

    const articleContainerStyle = {
        //border: '1px solid #ccc',
        //borderRadius: '5px',
        //padding: '10px',
        marginBottom: '20px',
        backgroundColor: '#1976d2',
        color: 'white',
        fontSize: '20px',
    };
      
    const articlePhotoStyle = {
        width: '100%', // Set width to 100% to fill the container
        height: '315px', // Set a fixed height for the aspect ratio
        objectFit: 'cover',
        //borderRadius: '5px',
    };
      
    const articleNameStyle = {
        marginTop: '10px',
        fontWeight: 'bold',
        textAlign: 'center', // Center text horizontally
    };

    const handleClick = (filePath) => {
        window.open(filePath, '_blank');
    };
      
    const openPDF = (pdfData) => {
        const pdfURL = `data:application/pdf;base64,${pdfData}`;
    
        // Create a new window or tab with an embedded PDF viewer
        const newWindow = window.open();
        newWindow.document.write(`
            <iframe src="${pdfURL}" style="width: 100%; height: 100%;" frameborder="0"></iframe>
        `);
        };

    useEffect(() => {

        async function getArticles(){
           
            try {

                const response = await axios.get('http://localhost:80/api/article_content.php');
                //console.log(response.data);
                const jsonD = response.data.split('[{')[1]
                //console.log(jsonD);
                const str = "[{"+jsonD;
                const dataArray = JSON.parse(str);
                setArticles(dataArray);

              } catch (error) {
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
              }    
        }
        getArticles();
        //console.log(articles);
        		
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
       
        <AppBar position="static" elevation={0} >
                <Toolbar>
                    <Typography variant="h6"  style={{ flex: 1, fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }} >
                        Články
                    </Typography>
                </Toolbar>
            </AppBar>
            <div>
        <Row md={3} className="g-4" style={{ alignItems: 'stretch', padding: '7% 10%' }}>
                {articles.map(article => (
                    <Col key={article.id}>
                        <div style={articleContainerStyle} onClick={() => openPDF(article.pdf_data)}>
                            <img src={`data:image/jpeg;base64,${article.image_data}`} alt="Article Photo" style={articlePhotoStyle} />
                            <div style={articleNameStyle}>{article.name.slice(0, -4)}</div>
                        </div>
                    </Col>
                ))}
        </Row>
            </div>

        </div>
    </div>
  );
}

export default GridExample;
