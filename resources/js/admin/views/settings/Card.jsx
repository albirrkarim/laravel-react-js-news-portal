import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    CircularProgress,
    Button,
    makeStyles,
    InputLabel,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import dataKey from "./data";

const useStyles = makeStyles((theme) => ({
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

const SettingClass = ({ setting, refreshData }) => {
    const classes = useStyles();

    const [key, setKey] = useState(setting.key);
    const [value, setValue] = useState(setting.value);
    const [role, setRole] = useState(setting.role);

    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [fileName, setFileName] = useState("Select file");
    const [file, setFile] = useState();

    const BASE_URL = location.origin + "/data/settings/" + setting.id;

    function makeName(s) {
        let n = s.substr(s.lastIndexOf("\\") + 1);
        if (n.length > 50) {
            n = n.substring(0, 50);
        }

        return n;
    }

    function str_limit(str, len = 20) {
        if (str.length > len) {
            str = str.substring(0, len) + "...";
        }
        return str;
    }

    let changeFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(makeName(e.target.value));
    };

    let store = (event) => {
        event.preventDefault();

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
            .post(BASE_URL, formData, config)
            .then(function (data) {
                if (data.data == true) {
                    refreshData();
                } else {
                    alert("Gagal edit data !");
                }

                console.clear();

                setFile(null);
                setFileName("Select file");

                setIsEditMode(false);

                setIsLoading(false);
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    let deleteFunc = (e) => {
        axios
            .delete(BASE_URL)
            .then(() => {
                refreshData();
            })
            .catch(function (error) {
                alert(error.message);
            });
    };

    let getForm = () => {
        return (
            <Card className={clsx(classes.root)}>
                <CardContent>
                    <h5>Edit </h5>
                    <form
                        method="post"
                        onSubmit={store}
                        encType="multipart/form-data"
                    >
                        <InputLabel>Key</InputLabel>
                        <Select
                            labelId="key"
                            value={key}
                            name="key"
                            className="mb-3"
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
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                value={value}
                                name="value"
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
            return getForm();
        }
    } else {
        return (
            <Card className={clsx(classes.root)}>
                <CardContent
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                >
                    <Typography align="center" gutterBottom variant="h4">
                        {str_limit(key)}
                    </Typography>

                    {setting.role == "text" ? (
                        <Typography
                            align="center"
                            className="text-muted"
                            variant="body1"
                        >
                            {str_limit(value)}
                        </Typography>
                    ) : (
                        <Box display="flex" justifyContent="center" mb={3}>
                            {setting.role == "image" ? (
                                <img
                                    style={{ maxHeight: 300 + "px" }}
                                    className="w-100 rounded"
                                    src={
                                        location.origin +
                                        "/storage/logo/" +
                                        setting.file
                                    }
                                    alt={key}
                                />
                            ) : (
                                <video
                                    className="w-100 rounded"
                                    style={{ maxHeight: 300 + "px" }}
                                    controls
                                    src={
                                        location.origin +
                                        "/storage/video/" +
                                        setting.file
                                    }
                                ></video>
                            )}
                        </Box>
                    )}
                </CardContent>
                <Box flexGrow={1} />
                <Divider />
                <Box p={2}>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={(e) =>
                            window.confirm(
                                "Are you sure you wish to delete this item?"
                            ) && deleteFunc(e)
                        }
                    >
                        Delete
                    </Button>
                </Box>
            </Card>
        );
    }
};

export default SettingClass;
