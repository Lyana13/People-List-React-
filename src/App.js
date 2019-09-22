import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Container, Row, Col} from "react-bootstrap";

export default class PeopleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      people: [],
      name: "",
      surname: "",
      age: "",
      female: false,
      male: true
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('https://venbest-test.herokuapp.com/')
      .then(res => {
        const people = res.data;
        this.setState({ people });
      })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  convertSex(gender) {
    if (gender == "m")
      return "мужской";
    else if (gender == "f")
      return "женский";
    else
      return "";
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <label>
                Имя:
              </label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Фамилия:
              </label>
                <input type="text" name="surname" value={this.state.surname} onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
              Возраст: 
              </label>
              <input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <label>
                Пол:
              </label>
                <input type="checkbox" name="male" checked={this.state.male} onChange={this.handleChange} />м
                <input type="checkbox" name="female" checked={this.state.female} onChange={this.handleChange}/>ж    
            </Col>
          </Row>
          {
            this.state.people
            .filter(person => person.name.search(this.state.name) != -1 && person.lastname.search(this.state.surname) != -1)
            .filter(person => (this.state.female && person.sex == "f") || (this.state.male && person.sex == "m"))
            .filter(person => !this.state.age || person.age == this.state.age)
            .map((person, index) =>
              <div key={index}>
                <hr/>
                <p>{person.name} {person.lastname}</p>
                <p>Возраст: {person.age}</p>
                <p>Пол: {this.convertSex(person.sex)}</p>
              </div>
            )
          }
          <hr />
        </Container>
      </React.Fragment>
    )
  }
}

