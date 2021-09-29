import React from 'react';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: [],
      value: "test",
    };
    this.handleChange = this.handleChange.bind(this);
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
    axios.post('/api/users/', {name : this.state.value, email : this.state.value + "@email.com"})
    .then(res => this.getData())
    .catch((err) => console.log(err))
  }

  handleDelete = (item) => {
    axios.delete(`/api/users/${item.id}/`)
    .then(res => this.getData())
  }

  handleChange(event) {
    this.setState({ value : event.target.value });
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
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
