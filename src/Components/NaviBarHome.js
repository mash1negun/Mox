import { Navbar, Nav, Button } from 'react-bootstrap';
import styled from 'styled-components';
import '../Fonts/Phosp.ttf';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory } from "react-router-dom";


const Styles = styled.div`
    .navbar-brand {
        font-family: 'Phosphate';
        font-size: 30px;
        font-weight: 100;
        color: #000;
        &:hover {
            color: black
        }
    }

    .navbar {
        background-color: #49d0d0;
    }

    .navbar-nav .nav-link {
        text-shadow: #fff 0 0 1px;
        font-weight: 600;
        color: #fff;
        }
    }
    
`

export default function NaviBarHome() {
    
    const history = useHistory();
    const handleSubmit = (event) => {
    window.localStorage.clear()
    history.push("/Start");
}

    return ( 
    <Styles>
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand>MOX</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item><Nav.Link href="/Books">Книги</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/Movies">Фильмы</Nav.Link></Nav.Item>
                </Nav>
                <Nav>
                    <Button variant="dark" className="mr-2"  onClick={handleSubmit}>Выйти</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)}