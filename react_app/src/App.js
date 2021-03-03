import React from 'react';
import './App.css';
//import Person from './Person/Person'; //importa una clase

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      length: 0
    }
  }

  handleOnChange = (event) => {
    this.setState({
      content: event.target.value,
      length: event.target.value.length
    })
  }

  render() {
    return (
      <div className="App">
        <input type = 'text' 
          name = 'content' 
          value = {this.state.content} 
          onChange = {this.handleOnChange}/>
        <p >{this.state.length}</p>
      </div>
    )
  }
}



export default App;
