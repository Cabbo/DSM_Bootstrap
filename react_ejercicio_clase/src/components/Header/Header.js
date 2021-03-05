import React from 'react';
import clases from './Header.module.css';
import Ponclase from '../../hoc/Ponclase';

class Header extends React.Component {

    render() {

        return (
            <Ponclase className={clases.Header}>
                <h1>{this.props.titulo}</h1>
                <p className={estilos.join(' ')}>Parece que funciona</p>
                <button style={estilo} onClick={this.props.cambiandounnombre}>Cambio un nombre</button>
            </Ponclase>
        )
    }
}

export default Header;