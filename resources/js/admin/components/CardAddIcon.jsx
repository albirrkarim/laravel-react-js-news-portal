import React, { Component } from "react";
var cardStyle = {
    maxWidth: 250 + "px",
    minWidth: 200 + "px"
};

class CardAddIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div
                className="card bg-white m-3 border-0 shadow pointer text-center text-secondary"
                onClick={this.props.click}
                style={cardStyle}
            >
                <div className="card-body">
                    <div className="mt-4">
                        <span
                            className="align-middle"
                            style={{ fontSize: 3 + "rem" }}
                        >
                            {/* <FontAwesomeIcon icon={faPlus} /> */}
                        </span>
                        <h5>Tambah</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardAddIcon;
