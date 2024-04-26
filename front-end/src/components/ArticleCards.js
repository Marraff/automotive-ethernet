import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import React from 'react'; 

function GridExample() {

    const [articles, setArticles] = React.useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
	const [status, setStatus] = React.useState([]);

    const handleClick = (filePath) => {
        window.open(filePath, '_blank');
      };

    useEffect(() => {

        async function getArticles(){
            try{
                
                const resp = await axios.get('http://localhost:80/api/article.php');
                
                //console.log(resp);
                /*const jsonD = resp.data.split('"articles":')[1]
                const str = jsonD.substring(0, jsonD.length - 1);
                const dataArray = JSON.parse(str);
                setArticles(dataArray);*/
                
                
            }catch(error){
                //setStatus(`$'error' ${error.message}`);
                enqueueSnackbar(`$'error' ${error.message}`, { variant: 'error' });
            }        
        }
        getArticles();
        console.log(articles);
        		
	}, [])

    return (
    
    <div>

        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#" style={{'font-weight': 'bold'}}>Články</Navbar.Brand>
        </Container>
        </Navbar>

        <Row xs={1} md={4} className="g-4" style={{'align-items': 'stretch', padding: '7% 10%' }}>
            <ul>
                {articles.map((article) => (
                <li key={article.id} onClick={() => handleClick(article.file_path)}>
                    {article.name}
                </li>
                ))}
            </ul>
        </Row>
    </div>
  );
}

export default GridExample;

/*
<div>

        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
            <Navbar.Brand href="#" style={{'font-weight': 'bold'}}>Články</Navbar.Brand>
        </Container>
        </Navbar>

        <Row xs={1} md={4} className="g-4" style={{'align-items': 'stretch', padding: '7% 10%' }}>
        {Array.from({ length: 8 }).map((_, idx) => (
            <Col key={idx}>
            <Card  border="primary">
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