import React from 'react';


// se crea un componente
class Header extends React.Component {
  
    render() {
      return(
          <div>
            <h1>{this.props.title}</h1>
            <p>Subtítulo de cabecera</p>
          </div>

            
        
      )
    }
  }
  export default Header;