import React from 'react';

class ValidationComponent extends React.Component {

    render() {
        let length_comp;

        if (this.props.length < 5) {
            length_comp = "Texto demasiado corto";
        } else {
            length_comp = "Texto con longitud óptima";
        }



        return (
            <div>
                <h5>ValidationComponent</h5>
                <p>Lenght: {this.props.length}</p>
                <p>Comprobación de longitud: {length_comp}</p>

            </div>
        )
    }
}
export default ValidationComponent;