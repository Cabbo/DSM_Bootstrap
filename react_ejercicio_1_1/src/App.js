import React from 'react';
import './App.css';
import Person from './Person/Person';
import Header from './Header/Header';
import ShowHide from './showHide/ShowHide';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        { nombre: 'Pedro', edad: '24' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Juan', edad: '22' },
        { nombre: 'Pepe', edad: '24' },
        { nombre: 'Jota', edad: '25' },
        { nombre: 'Lope', edad: '22' }
      ],
      mostrar: true
    }
  }

  cambiaUnNombre = (nuevoNombre) => {
    //console.log('Entra');
    this.setState ({
      persons: [
        { nombre: nuevoNombre, edad: '24' },
        { nombre: 'Luis', edad: '25' },
        { nombre: 'Juan', edad: '22' }
      ]
    })
  }

  cambiaNombre = (event, id) =>{

    let personas = [...this.state.persons]; // esparcir para crear una copia del array
    personas[id].nombre = event.target.value;

    this.setState ({
      persons: personas
    })
  }

  borraPersona = (id) => {
    let personas = [...this.state.persons]; // spread para crear una copia del array
    personas.splice(id,1); //quitar una persona
    //personas[id].nombre = 'Borrado';
    this.setState ({
      persons: personas
    })
  }

  mostrarOcultar = () => {
    let show = this.state.mostrar; 
    this.setState ({
      mostrar: !show
    })
  }

  render() {

    const estilo = {
      backgroundColor: 'white',
      border: '1px solid blue'
    };

    let listapersonas = null;
    if(this.state.mostrar){
      // listapersonas = (
      //   <div>
      //     <Person 
      //       nombre={this.state.persons[0].nombre} 
      //       edad={this.state.persons[0].edad} 
      //       cambiando={(event)=>this.cambiaNombre(event, 0)}
      //       borrando={()=>this.borraPersona(0)}
      //       />
      //     <Person 
      //       nombre={this.state.persons[1].nombre} 
      //       edad={this.state.persons[1].edad} 
      //       cambiando={(event)=>this.cambiaNombre(event, 1)}
      //       borrando={()=>this.borraPersona(0)}
      //       />
      //     <Person 
      //       nombre={this.state.persons[2].nombre} 
      //       edad={this.state.persons[2].edad} 
      //       cambiando={(event)=>this.cambiaNombre(event, 2)}
      //       borrando={()=>this.borraPersona(0)}
      //       >Child de persona - Saludo desde aquí
      //     </Person>
      //   </div>
      // );
      listapersonas = (
        <div>
          {
            this.state.persons.map((persona, id)=>{
              return <Person 
                        key={id}
                        nombre={persona.nombre} 
                        edad={persona.edad}  
                        cambiando={(event)=>this.cambiaNombre(event, id)}
                        borrando={()=>this.borraPersona(id)}
                      />
            })
          }
        </div>
      ) 
    }


    return (
      <div className="App">
        <Header titulo="El título que quiera cuando quiera" />
        <button style={{estilo}} onClick={()=>this.cambiaUnNombre('Julián')}>Cambio un nombre</button>
        <ShowHide mostrarocultar={this.mostrarOcultar}/>
        {/* <div>
          <button onClick={this.mostrarOcultar}>Mostrar/ocultar</button>
        </div> */}
        {listapersonas}

      </div>
    )
  }

}

export default App;
