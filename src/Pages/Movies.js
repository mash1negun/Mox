import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Helmet } from "react-helmet-async";
import NaviBarHome from '../Components/NaviBarHome';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const Styles = styled.div`
    .text {
        margin-top: 15px;
        margin-left: 0px;
        margin-bottom: 15px;
    }
    .Button {
        margin-top: 31px;
        margin-left: 10px;
        margin-bottom: 30px;

    }
`
export default function Movies() {

    const [Name, addName] = useState('');
    const [Genre, addGenre] = useState('');
    const [Director, addDirector] = useState('');
    const [Year, addYear] = useState('');

    const [validated, setValidated] = useState(false);

    // Adding data from form to database

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (Number.isNaN(Year)) {
            alert("Год должен быть числом")
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        const movie = {
            'name': Name,
            'genre': Genre,
            'director': Director,
            'year': Number.parseInt(Year)
        }
        const local = window.localStorage.getItem('login');

        axios.post('http://localhost:9001/contentService/movie/' + local, movie)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
        setValidated(true);
    };

    const [movies, setMovies] = useState([]);

    function deleteMovie(id) {
        axios.delete('http://localhost:9001/contentService/movie/' + id)
        .then(res => {
            loadMoviesData();
            console.log(res);
        })
        console.log("delete movie - " + id)
    }

    function loadMoviesData() {
        axios.get('http://localhost:9001/contentService/movie/' + local)
            .then(res => {
                console.log(res);
                window.localStorage.setItem('movies', res.data);
                var moviesArray = res.data;
                setMovies(moviesArray);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        loadMoviesData();
      }, []);

    const columns = [
        { dataField: 'name', text: 'Название фильма', sort: true },
        { dataField: 'director', text: 'Режиссёр', sort: true },
        { dataField: 'genre', text: 'Жанр', sort: true },
        { dataField: 'year', text: 'Год выпуска', sort: true },
        { dataField: 'deleteButton', text: ' ', sort: false, align: "center", isDummyField: true, headerStyle:{width: "60px"}, formatter: (rowContent, row) => {return(<Button style={{margin: "1px"}} className="Button" variant="danger" type="submit" onClick={() => {deleteMovie(row.id)}}>X</Button>)} }
      ];
    
    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];  

    const movie = {
        'name': Name,
        'genre': Genre,
        'director': Director,
        'Year': Year
    }

    const local = window.localStorage.getItem('login');
    
    return(
        <Styles>
            <NaviBarHome/>
            <React.Fragment>
            <Helmet>
                <title>Книги | Mox</title>
            </Helmet>
                <Container>
                    <h5 className ="text">Добавить фильм в список:</h5>
                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formGroupTitleMov">
                                    <Form.Label>Название:</Form.Label>
                                    <Form.Control required type="text" onChange={e => addName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupProdMov">
                                    <Form.Label>Режиссёр:</Form.Label>
                                    <Form.Control required type="text" onChange={e => addDirector(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupGenreMov">
                                    <Form.Label>Жанр:</Form.Label>
                                    <Form.Control required type="text" onChange={e => addGenre(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupYearMov">
                                    <Form.Label>Год выпуска:</Form.Label>
                                    <Form.Control required type="number" min="0" pattern="\d*" onChange={e => addYear(e.target.value)} />
                                </Form.Group>
                            </Col>
                                <Button className="Button" variant="success" type="submit">Добавить</Button>
                        </Row>
                    </Form>
                </Container>
                <Container>
                    <BootstrapTable bootstrap4 keyField='id' data={movies} columns={columns} defaultSorted={defaultSorted} />
                </Container>
            </React.Fragment>
        </Styles>
    )
}