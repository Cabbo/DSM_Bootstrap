import React from 'react';
import './Person.css';

class Person extends React.Component {
    render() {
        return (
            <div className="Person">
                <p>Soy una persona y mi nombre es {this.props.nombre}.</p>
                <p>Y mi edad es {this.props.edad}.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.cambiando} value={this.props.nombre}/>
                <button onClick={this.props.borrando}>Borrar</button>
            </div>
        )
    }
}

export default Person;