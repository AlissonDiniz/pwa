import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Container, Row, Col, Spinner, Image, Breadcrumb, Table, Navbar } from 'react-bootstrap';

import moment from 'moment';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      page: "ALBUM",
      data: []
    };
  }

  componentDidMount() {
    this._loadAlbums();
  }

  _loadAlbums = () => {
    const self = this;
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        self.setState({ page: "ALBUM", loading: false, data });
      });
  }

  _loadPhotos = (albumId) => {
    const self = this;
    self.setState({ page: "PHOTO", loading: true, albumId: "" });
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=" + albumId, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        self.setState({ page: "PHOTO", loading: false, albumId, data });
      });
  }

  _goToAlbums = () => {
    this.setState({ page: "PHOTO", loading: true });
    this._loadAlbums();
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {' PWA Application'}
          </Navbar.Brand>
        </Navbar>
        <Container fluid={true}>
          {this.state.page === "ALBUM" &&
            <Row>
              <Col>
                <br />
                <h3>
                  Lista de Albums
                </h3>
                <br />
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titulo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading &&
                      <tr>
                        <td colSpan="2" className="text-center">
                          <Spinner animation="border" />
                        </td>
                      </tr>
                    }
                    {!this.state.loading && this.state.data.map(it => {
                      return <tr onClick={() => this._loadPhotos(it.id)}>
                        <td>{it.id}</td>
                        <td>{it.title}</td>
                      </tr>
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          }
          {this.state.page === "PHOTO" &&
            <Row>
              <Col>
                <br />
                <h3>
                  Fotos do Album - {this.state.albumId}
                </h3>
                <br />
                <Breadcrumb>
                  <Breadcrumb.Item href="#" onClick={() => this._goToAlbums()}>Lista de Albums</Breadcrumb.Item>
                </Breadcrumb>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Titulo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.loading &&
                      <tr>
                        <td colSpan="2" className="text-center">
                          <Spinner animation="border" />
                        </td>
                      </tr>
                    }
                    {!this.state.loading && this.state.data.map(it => {
                      return <tr>
                        <td><Image src={it.thumbnailUrl} width="80" height="80" rounded /></td>
                        <td>{it.title}</td>
                      </tr>
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          }
        </Container>
      </div>
    );
  }
}

export default App;