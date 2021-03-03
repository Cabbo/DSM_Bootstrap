import React from 'react';


// se crea un componente
class Person extends React.Component {

    render() {
        return (
            <div>
                <p>This is a person.</p>
                <p>My name is {this.props.name} and I am {this.props.age}. Cambiado a {this.props.changed}</p>
                <p>{this.props.children}.</p>
                <input
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </div>
        )
    }
}
export default Person;