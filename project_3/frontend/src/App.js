import React from 'react';
import axios from 'axios';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
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

  sendInfo(event) {
    axios.post('/api/users/', {name : event.target.value, email : event.target.value + "@email.com"})
    .then(res => this.getData())
    .catch((err) => console.log(err))
  }

  handleDelete = (item) => {
    axios.delete(`/api/users/${item.id}/`)
    .then(res => this.getData())
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
      <form>
        <label>
          Name:
          <input type="text" onChange={this.sendInfo} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}
