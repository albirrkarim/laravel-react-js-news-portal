import React from "react";

export default function ButtonCancel({ onClick }) {
    return (
        <p
            className="text-danger mt-1 mb-1 ml-2 mr-2 pointer"
            onClick={onClick}
        >
            Cancel
        </p>
    );
}
