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
        margin-right: 15px;
        margin-bottom: 30px;
    }`

export default function Books() {

    const [Name, addName] = useState('');
    const [Genre, addGenre] = useState('');
    const [Author, addAuthor] = useState('');

    const [validated, setValidated] = useState(false);

    // Adding data from form to database

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        const book = {
            'name': Name,
            'genre': Genre,
            'author': Author
        }
        const local = window.localStorage.getItem('login');

        axios.post('http://localhost:9001/contentService/book/' + local, book)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
        setValidated(true);
    };

    const [books, setBooks] = useState([]);

    function deleteBook(id) {
        axios.delete('http://localhost:9001/contentService/book/' + id)
        .then(res => {
            loadBooksData();
            console.log(res);
        })
        console.log("delete book - " + id)
    }

    function loadBooksData() {
        axios.get('http://localhost:9001/contentService/book/' + local)
            .then(res => {
                console.log(res);
                window.localStorage.setItem('books', res.data);
                var booksArray = res.data;
                setBooks(booksArray);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        loadBooksData();
      }, []);

    const columns = [
        { dataField: 'name', text: 'Название книги', sort: true },
        { dataField: 'author', text: 'Автор', sort: true },
        { dataField: 'genre', text: 'Жанр', sort: true },
        { dataField: 'deleteButton', text: ' ', sort: false, align: "center", isDummyField: true, headerStyle:{width: "60px"}, formatter: (rowContent, row) => {return(<Button style={{margin: "1px"}} className="Button" variant="danger" type="submit" onClick={() => {deleteBook(row.id)}}>X</Button>)} }
      ];
    
    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];  

    const book = {

        'name': Name,
        'genre': Genre,
        'author': Author
    }

    const local = window.localStorage.getItem('login');

    return (
        <Styles>
            <NaviBarHome />
            <React.Fragment>
                <Helmet>
                    <title>Книги | Mox</title>
                </Helmet>
                <Container>
                    <h5 className="text">Добавить книгу в список:</h5>
                    <Form validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formGroupTitleBook">
                                    <Form.Label>Название:</Form.Label>
                                    <Form.Control requiredtype="text" onChange={e => addName(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupAuthorBook">
                                    <Form.Label>Автор:</Form.Label>
                                    <Form.Control required type="text" onChange={e => addAuthor(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formGroupGenreBook">
                                    <Form.Label>Жанр:</Form.Label>
                                    <Form.Control required type="text" onChange={e => addGenre(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Button className="Button" variant="success" type="submit">Добавить</Button>
                        </Row>
                    </Form>
                </Container>
                <Container>
                        <BootstrapTable bootstrap4 keyField='id' data={books} columns={columns} defaultSorted={defaultSorted} />
                </Container>
            </React.Fragment>
        </Styles>
    )
}