import React, { Component } from "react";

class ButtonCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <p
                className="text-danger mt-1 mb-1 ml-2 mr-2 pointer"
                onClick={this.props.click}
            >
                Cancel
            </p>
        );
    }
}

export default ButtonCancel;
