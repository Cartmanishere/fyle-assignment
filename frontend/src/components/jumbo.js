import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';

class AppJumbo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Jumbotron style={{backgroundColor: "#81ecec"}}>
                    <h1 className="display-3">Welcome visitor!</h1>
                </Jumbotron>
            </div>
        );
    }
}

export default AppJumbo;