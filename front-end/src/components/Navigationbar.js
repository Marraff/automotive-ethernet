import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#" style={{'font-weight': 'bold'}}>Automotive Ethernet</Navbar.Brand>
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
            <Button >Prihlásenie</Button>
            <Button>Registrácia</Button>
          </ButtonGroup>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;