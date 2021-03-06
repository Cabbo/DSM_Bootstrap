import React from 'react';

class CharComponent extends React.Component {

    render() {

        const style_v = {
            display: 'inline-block',
            padding: '16px',
            textAlign: 'center',
            margin: '16px',
            border: '1px solid black'
        };


        return (
            <div className="CharComponent"
                onClick={this.props.click}
                style={style_v}>
                {this.props.char}
            </div>
        )
    }
}
export default CharComponent;