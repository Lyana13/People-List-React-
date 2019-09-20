import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

export default class PeopleList extends React.Component {
  state = {
    people: []
  }

  componentDidMount() {
    axios.get('https://venbest-test.herokuapp.com/')
      .then(res => {
        const people = res.data;
        this.setState({ people });
      })
  }

  render() {
    let key = 0;
    return (
      <React.Fragment>
        <label>
          Имя:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
          Фамилия:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
          Возраст:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Пол:
            <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
            <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
        </label>
        <ul>
          {
            this.state.people.map(person =>
              <li key={key++}>{person.name} {person.lastname} {person.age} {person.sex}</li>)
          }
        </ul>
      </React.Fragment>
    )
  }
}

