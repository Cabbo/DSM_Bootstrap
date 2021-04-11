import React from 'react';
import clases from './App.module.css';
import Persons from '../components/Persons/Persons';
import Header from '../components/Header/Header';
import Showhide from '../components/Showhide/Showhide';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { nombre: 'Pedro', edad: '24' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Juan', edad: '22' }
      ],
      mostrar: true
    }
  }

  componentDidMount() {
    console.log('<App> se ha montado');
  }
  componentWillUnmount() {
    console.log('<App> se va a desmontar');
  }

  cambiaUnNombre = (nuevoNombre) => {
    //console.log('Entra');
    this.setState({
      persons: [
        { nombre: nuevoNombre, edad: '24' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Juan', edad: '22' }
      ]
    })
  }

  cambiaNombre = (event, id) => {
    let personas = [...this.state.persons];
    personas[id].nombre = event.target.value;
    this.setState({ persons: personas });
  }

  borrapersona = (id) => {
    let personas = [...this.state.persons];
    personas.splice(id, 1);
    //personas[id].nombre = 'Borrado';
    this.setState({ persons: personas });
  }

  mostrarOcultar = () => {
    let ver = this.state.mostrar;
    this.setState({ mostrar: !ver })
  }

  render() {


    let listapersonas = null;
    if (this.state.mostrar) {
      // listapersonas = (
      //   <div>
      //     <Person nombre={this.state.persons[0].nombre}
      //       edad={this.state.persons[0].edad}
      //       cambiando={(event) => this.cambiaNombre(event, 0)}
      //       borrando={() => this.borrapersona(0)} />
      //     <Person nombre={this.state.persons[1].nombre}
      //       edad={this.state.persons[1].edad}
      //       cambiando={(event) => this.cambiaNombre(event, 1)}
      //       borrando={() => this.borrapersona(1)} />
      //     <Person nombre={this.state.persons[2].nombre}
      //       edad={this.state.persons[2].edad}
      //       cambiando={(event) => this.cambiaNombre(event, 2)}
      //       borrando={() => this.borrapersona(2)}>Saludo desde aquí</Person>
      //   </div>)
      listapersonas = (
        <Persons
          personas={this.state.persons}
          escribir={this.cambiaNombre}
          borrar={this.borrapersona} />
      )



    }

    return (
      <div className={clases.App}>
        <Header titulo={this.props.titulo}
          cambiandounnombre={() => this.cambiaUnNombre('Julián')}
          numeropersonas={this.state.persons.length} />
        <Showhide mostrarocultar={this.mostrarOcultar} />
        {listapersonas}

      </div>
    )
  }

}

export default App;
