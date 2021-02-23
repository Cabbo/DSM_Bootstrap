import React from 'react';
import './App.css';
import Result from './Result/Result'; //importa una clase

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {buttonSelector:'A', value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (this.state.buttonSelector == '') {

    }
    if (this.state.buttonSelector == 'A') {
      this.setState({
        buttonSelector: this.state.buttonSelector,
        value: event.target.value,
        result: event.target.value * 37
      });
    }else if (this.state.buttonSelector == 'B') {
      this.setState({
        buttonSelector: this.state.buttonSelector,
        value: event.target.value,
        result: event.target.value * 43
      });
    }
  }
  changeMult(value){
    if (value == 'A') {
      this.setState({
        buttonSelector: value,
        value: this.state.value,
        result: this.state.value * 37
      });
    }else if (value == 'B') {
      this.setState({
        buttonSelector: value,
        value: this.state.value,
        result: this.state.value * 43
      });
    }

  }

  render() {
    return (
      <div className="App">
        <h1>Multiplicaciones</h1>
        <div>
          <input type="text" onChange={this.handleChange} value={this.state.value}/>
          <div>
            <button onClick={() => this.changeMult('A')} value='A'>A. x 37</button>
            <button onClick={() => this.changeMult('B')} value='B'>B. x 43</button>
          </div>

          <div>
            <Result buttonSelector={this.state.buttonSelector} result={this.state.result}></Result>
          </div>
        </div>
        
        {/* https://stackoverflow.com/questions/42550341/react-trigger-onchange-if-input-value-is-changing-by-state  */}

      </div>
    )
  }
}

export default App;
