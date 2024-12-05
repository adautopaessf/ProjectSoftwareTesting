import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/cadastrarcliente">CLIENTES</Nav.Link>
          <Nav.Link as={Link} to="/agendamento">AGENDAMENTO</Nav.Link>
          <Nav.Link as={Link} to="/cadastrarveiculo">VEÍCULOS</Nav.Link>
          <Nav.Link as={Link} to="/checkindiagnostico">CHECKIN</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
