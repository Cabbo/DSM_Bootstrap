import React from 'react';


class ShowHide extends React.Component {
    render() {
        return (
            <div className="ShowHide">
                <button onClick={this.props.mostrarocultar}>Mostrar/ocultar</button>
            </div>
        )
    }
}

export default ShowHide;