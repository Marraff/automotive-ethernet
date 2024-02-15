import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';

function GridExample() {
  return (
    
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
  );
}

export default GridExample;