import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

import axios from "axios";

export default function DeleteButton({ url, refreshData }) {
    let deleteFunction = e => {
        axios
            .delete(url)
            .then(() => {
                refreshData();
            })
            .catch(function(error) {
                alert(error.message);
            });
    };

    return (
        <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            className="text-white"
            onClick={e =>
                window.confirm("Are you sure you wish to delete this item?") &&
                deleteFunction(e)
            }
        >
            Delete
        </Button>
    );
}
