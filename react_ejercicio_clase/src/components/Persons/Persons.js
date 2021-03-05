import React from 'react';
import Person from './Person/Person';

class Persons extends React.Component {
    componentDidMount(){
        console.log('<Persons> se ha montado');
    }
    componentWillUnmount(){
        console.log('<Persons> se va a desmontar');
    }
    render() {
        return (
            <React.Fragment>
                {this.props.personas.map((persona, id) => {
                    return <Person nombre={persona.nombre}
                        key={id}
                        edad={persona.edad}
                        cambiando={(event) => this.props.escribir(event, id)}
                        borrando={() => this.props.borrar(id)} />
                })}
            </React.Fragment>
        )
    }
}

export default Persons;