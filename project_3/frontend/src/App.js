import React from 'react';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: [],
      name: "name",
      email: "email@email.com",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.sendInfo = this.sendInfo.bind(this);
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    axios.get('/api/users/')
    .then((res) => {
      this.setState({ info : res.data })
    }).catch((err) => console.log(err))
  }

  sendInfo() {
    axios.post('/api/users/', {name : this.state.name, email : this.state.email})
    .then(res => this.getData())
    .catch((err) => console.log(err))
  }

  handleDelete = (item) => {
    axios.delete(`/api/users/${item.id}/`)
    .then(res => this.getData())
  }

  handleNameChange(event) {
    this.setState({ name : event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email : event.target.value });
  }

  render() {
    return (
      <div>
      <ul>
        {this.state.info.map(info => (
          <li>name: {info.name} <br/> 
          email: {info.email} <br/>
          <button onClick={() => this.handleDelete(info)}>Delete</button>
          </li>
          ))}
      </ul>
      <form onSubmit={this.sendInfo}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleNameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
