import React, { Component } from "react";

class ButtonSubmits extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        );
    }
}

export default ButtonSubmits;
