import React, { useState, useEffect } from "react";
import axios from "axios";

import clsx from "clsx";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import {
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    FormGroup,
    CircularProgress,
    IconButton,
    makeStyles,
    InputLabel,
} from "@material-ui/core";

import dataKey from "./data";

const classes = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    statsItem: {
        alignItems: "center",
        display: "flex",
    },
    statsIcon: {
        marginRight: theme.spacing(1),
    },
}));

const CardAddClass = ({ refreshData }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [key, setKey] = useState(dataKey[0][0]);
    const [value, setValue] = useState("");
    const [role, setRole] = useState(dataKey[0][1]);

    const [fileName, setFileName] = useState("Select file");
    const [file, setFile] = useState();

    function makeName(s) {
        let n = s.substr(s.lastIndexOf("\\") + 1);
        if (n.length > 50) {
            n = n.substring(0, 50);
        }

        return n;
    }

    let changeFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(makeName(e.target.value));
    };

    let store = (event) => {
        event.preventDefault();

        const url = location.origin + "/data/settings";

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();

        formData.append("key", key);
        formData.append("value", value);
        formData.append("role", role);

        formData.append("file", file);

        setIsLoading(true);
        axios
            .post(url, formData, config)
            .then(function (data) {
                if (data.data == true) {
                    refreshData();
                } else {
                    alert("Gagal edit data !");
                }

                setIsLoading(false);
                setIsEditMode(false);

                setValue("");

                setFile(null);
                setFileName("Select file");
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    if (isEditMode) {
        if (isLoading) {
            return (
                <Card className={clsx(classes.root)}>
                    <CardContent className="d-flex justify-content-center pt-5 pb-5">
                        <CircularProgress />
                    </CardContent>
                </Card>
            );
        } else {
            return (
                <Card className={clsx(classes.root)}>
                    <CardContent>
                        <form onSubmit={store} method="post">
                            <TextField type="hidden" name="role" value={role} />

                            <InputLabel>Key</InputLabel>
                            <Select
                                labelId="key"
                                value={key}
                                name="key"
                                onChange={(e) => {
                                    setKey(e.target.value);
                                }}
                            >
                                {dataKey.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            setRole(item[1]);
                                        }}
                                        value={item[0]}
                                    >
                                        {item[0]}
                                    </MenuItem>
                                ))}
                            </Select>

                            {role == "text" ? (
                                <TextField
                                    label="value"
                                    required
                                    fullWidth
                                    multiline
                                    rows={10}
                                    margin="dense"
                                    name="value"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                    variant="outlined"
                                />
                            ) : (
                                <div className="form-group">
                                    <Button
                                        variant="contained"
                                        component="label"
                                        fullWidth
                                    >
                                        {fileName}
                                        <input
                                            type="file"
                                            onChange={changeFile}
                                            style={{ display: "none" }}
                                            name="file"
                                        />
                                    </Button>
                                </div>
                            )}

                            <div className="form-group">
                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        xs
                                        className="justify-content-start d-flex"
                                    >
                                        <Button
                                            color="secondary"
                                            onClick={() => {
                                                setIsEditMode(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid
                                        item
                                        xs
                                        className="justify-content-end d-flex"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            );
        }
    } else {
        return (
            <Button
                variant="contained"
                color="secondary"
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
