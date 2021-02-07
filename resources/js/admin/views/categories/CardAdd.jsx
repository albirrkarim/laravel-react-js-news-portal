import React, { useState } from "react";
import axios from "axios";

import clsx from "clsx";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import {
    Card,
    CardContent,
    TextField,
    Button,
    CircularProgress,
    makeStyles,
    FormControl
} from "@material-ui/core";
import { makeName } from "../../utils/helper";


import EditNav from "../../components/CardCRUD/EditNav";

import InputCkEditor from "../../components/FormInput/InputCkEditor";
import InputImage from "../../components/FormInput/InputImage";

const classes = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column"
    },
    statsItem: {
        alignItems: "center",
        display: "flex"
    },
    statsIcon: {
        marginRight: theme.spacing(1)
    }
}));

const CardAddClass = ({refreshData }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let store = event => {
        event.preventDefault();
        const url = location.origin + "/data/categories";

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        const formData = new FormData();

        let { name } = event.target;

        formData.append("name", name.value);

        setIsLoading(true);
        axios
            .post(url, formData, config)
            .then(function(data) {
                if (data.data == true) {
                    refreshData();
                } else {
                    alert("Gagal edit data !");
                }

                setIsLoading(false);
                setIsEditMode(false);
            })
            .catch(function(error) {
                setIsEditMode(false);
                setIsLoading(false);
                alert(error.message);
            });
    };

    if (isEditMode) {
        return (
            <Card className={clsx(classes.root)}>
                <CardContent>
                    <form onSubmit={store} method="post">
                        <TextField
                            label="Name"
                            required
                            fullWidth
                            margin="dense"
                            name="name"
                            placeholder="name"
                            variant="outlined"
                        />

                        <FormControl className="d-block mt-2">
                            <EditNav
                                isLoading={isLoading}
                                onCancel={() => {
                                    setIsEditMode(false);
                                }}
                            />
                        </FormControl>
                    </form>
                </CardContent>
            </Card>
        );
    } else {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    setIsEditMode(true);
                }}
                className={classes.button}
                startIcon={<ControlPointIcon />}
            >
                Create
            </Button>
        );
    }
};

export default CardAddClass;
