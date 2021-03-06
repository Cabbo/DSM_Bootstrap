import React from 'react';
import './App.css';
import CharComponent from './Components/CharComponent/CharComponent';
import ValidationComponent from './Components/ValidationComponent/ValidationComponent';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      content_array:[],
      length: 0
    }
  }

  handleOnChange = (event) => {
    this.setState({
      content: event.target.value,
      content_array: event.target.value.split(""),
      length: event.target.value.length
    })
    //console.log(event.target.value.split(""))
  }

  deleteCharHandler = (i) => {
    //console.log(personIndex);
    const content_array = [...this.state.content_array];
    content_array.splice(i, 1); //replaces 1 element at index i with nothing
    this.setState({
      content: content_array.join(''),
      content_array: content_array,
      length: content_array.length
    });
  }

  render() {

    //let char_list = [];
    const char_list = this.state.content_array.map((char, index) => {
        return (<li >
          <CharComponent
            click={() => this.deleteCharHandler(index)}
            char={char}/>
          </li>);
      }
    );
    

    return (
      <div className="App">
        Introduce un texto:
        <input type='text'
          name='content'
          value={this.state.content}
          onChange={this.handleOnChange} />
        <p>Contador: {this.state.length}</p>

        <ValidationComponent length={this.state.length}/>

        <div>
          <h5>CharComponents:</h5>
          <ul>
            {char_list}
          </ul>
        </div>

      </div>
    )
  }
}



export default App;
