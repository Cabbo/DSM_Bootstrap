import React from 'react';


// se crea un componente
class Result extends React.Component {

    render() {
        return (
            <div>
                <p>Modo seleccionado: {this.props.buttonSelector}.</p>
                <p>Resultado: { this.props.result }</p>

            </div>
        )
    }
}
export default Result;