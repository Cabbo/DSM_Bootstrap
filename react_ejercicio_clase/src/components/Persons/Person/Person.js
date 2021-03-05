import React from 'react';
import clases from './Person.module.css';
import Ponclase from '../../'

class Person extends React.Component {
    componentDidMount(){
        console.log('<Person> se ha montado');
    }
    componentWillUnmount(){
        console.log('<Person> se va a desmontar');
    }
    render() {
        return (
            <div className={clases.Person}>
                <p>Soy una persona y mi nombre es {this.props.nombre}.</p>
                <p>Y mi edad es {this.props.edad}.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.cambiando} value={this.props.nombre} />
                <button onClick={this.props.borrando}>Borrar</button>
            </div>
        )
    }
}

export default Person;