import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import '../Fonts/Phosp.ttf';
import axios from 'axios';
import { BrowserRouter as Router, useHistory } from "react-router-dom";


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
`

export default function NaviBar() {

    const [showLog, setShowLog ]= useState(false);
    
    const handleCloseLog = () => setShowLog(false);
    const handleShowLog = () => setShowLog(true);

    const [showReg, setShowReg]= useState(false);
    
    const handleCloseReg = () => setShowReg(false);
    const handleShowReg = () => setShowReg(true);

    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [Login, setLogin] = useState('');
    const [Middle, setMiddle] = useState('');
    const [Pass, setPass] = useState('');

    const history = useHistory();
    
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        const reg = {
            'firstName' : FName,
            'lastName' : LName,
            'middleName' : Middle,
            'login' : Login,
            'password' : Pass
        }
        axios.post('http://localhost:9000/userService/user/add', reg)
            .then (res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
        setValidated(true);
    };
    
    const handleLogin = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        const log = {
            'login' : Login,
            'password' : Pass
        }
        axios.get('http://localhost:9000/userService/password/check/' + Login + '/' + Pass)
            .then (res => {
                console.log(res.data)
                if (res.data) {
                    window.localStorage.setItem('login', Login);
                    history.replace("/Home");
                } else {
                    alert('Проверьте введённые данные');
                }
            })
            .catch(err => {
                console.log(err);
            })
            event.preventDefault();

        setValidated(true);
    };

    return (
        <Styles>  
            <React.Fragment>
                <Navbar collapseOnSelect expand="lg">
                    <Navbar.Brand>MOX</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                        <Nav>
                            <Button variant="outline-light" className="mr-2" onClick={handleShowLog}>Войти</Button>
                            <Button variant="primary" onClick={handleShowReg}>Зарегистрироваться</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Modal show={showLog} onHide={handleCloseLog}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вход</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form validated={validated} onSubmit={handleLogin}>
                            <Form.Group controlId="fromBasicLogin">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control required type="login" placeholder="Введите логин" onChange={e => setLogin(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="fromBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control required type="password" placeholder="Введите пароль" onChange={e => setPass(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" >
                                Подтвердить
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <Modal show={showReg} onHide={handleCloseReg}>
                    <Modal.Header closeButton>
                        <Modal.Title>Регистрация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="fromBasicName">
                                <Form.Label>Имя</Form.Label>
                                <Form.Control required type="text" placeholder="Введите Имя" onChange={e => setFName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="fromBasicLast">
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control required type="text" placeholder="Введите Фамилию" onChange={e => setLName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="fromBasicMiddle">
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control required type="text" placeholder="Введите Отчество" onChange={e => setMiddle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="fromBasicEmail">
                                <Form.Label>Логин</Form.Label>
                                <Form.Control required type="login" placeholder="Введите логин" onChange={e => setLogin(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="fromBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control required type="password" placeholder="Введите пароль" onChange={e => setPass(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" name="register" >
                                Сохранить 
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </React.Fragment>
        </Styles> 
    )
}