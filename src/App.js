import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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
        console.log("ss", people);
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

  render() {
    return (
      <React.Fragment>
        <label>
          Имя:
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
          Фамилия:
          <input type="text" name="surname" value={this.state.surname} onChange={this.handleChange} />
          </label>
          <label>
          Возраст:
          <input type="number" name="age" value={this.state.age} onChange={this.handleChange} />
          </label>
          <label>
            Пол:
            female<input type="checkbox" name="female" checked={this.state.female} onChange={this.handleChange} />
            male<input type="checkbox" name="male" checked={this.state.male} onChange={this.handleChange} />
        </label>
        <ul>
          {
            this.state.people
            .filter(person => person.name.search(this.state.name) != -1 && person.lastname.search(this.state.surname) != -1)
            .filter(person => (this.state.female && person.sex == "f") || (this.state.male && person.sex == "m"))
            .filter(person => !this.state.age || person.age == this.state.age)
            .map((person, index) =>
              <li key={index}>{person.name} {person.lastname} {person.age} {person.sex}</li>
            )
          }
        </ul>
      </React.Fragment>
    )
  }
}

