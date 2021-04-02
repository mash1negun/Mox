import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class bookList extends Component {

  constructor(props) {
    super(props);
    this.state = {book: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/http://localhost:9001/contentService/book')
      .then(response => response.json())
      .then(data => this.setState({book: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`http://localhost:9001/contentService/book/{bookID}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedbook = [...this.state.book].filter(i => i.id !== id);
      this.setState({Book: updatedbook});
    });
  }

  render() {
    const {book, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const bookList = book.map(book => {
      return <tr key={book.id}>
        <td style={{whiteSpace: 'nowrap'}}>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="danger" onClick={() => this.remove(book.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="http://localhost:9001/contentService/book">Add Customer</Button>
          </div>
          <h3>Список книг</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">Книга</th>
                <th width="20%">Автор</th>
                <th width="20%">Жанр</th>
                <th width="10%">Действие</th>
              </tr>
            </thead>
            <tbody>
            {bookList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default bookList;