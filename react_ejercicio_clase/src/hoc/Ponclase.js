import React from 'react';

class Ponclase extends React.Component {

    render() {
        return (
            <div className={this.props.clase}>
                this.props.children
            </div>
        )
    }
}

export default Ponclase;