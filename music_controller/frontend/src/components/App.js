import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>Hello</div>;
    }
}

export default App;

const appDiv = document.getElementById('app');
render(<App />, appDiv);
