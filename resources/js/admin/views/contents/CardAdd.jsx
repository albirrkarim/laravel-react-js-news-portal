import React, { useState } from "react";
import axios from "axios";

import clsx from "clsx";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

import {
    Card,
    CardContent,
    TextField,
    Button,
    makeStyles,
    FormControl,
} from "@material-ui/core";

import EditNav from "../../components/CardCRUD/EditNav";

import InputCkEditor from "../../components/FormInput/InputCkEditor";
import InputImage from "../../components/FormInput/InputImage";
import InputText from "../../components/FormInput/InputText";
import SelectCategory from "./Partials/SelectCategory";

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

    const [category_id, setCategoryId] = useState("");

    const [text, setText] = useState("");
    const [file, setFile] = useState();

    let store = (event) => {
        event.preventDefault();
        const url = location.origin + "/data/contents";

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();

        let { name } = event.target;

        formData.append("name", name.value);
        formData.append("text", text);

        formData.append("file", file);
        formData.append("category_id", category_id);

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

                setFile(null);
            })
            .catch(function (error) {
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

                        <InputText
                            item={{ 
                                name: "description",
                                label : "Link halaman cari nomor / halaman lain ",
                                tutorial : (
                                    <p>
                                        Bagian ini bisa di ini link website / link ke halaman lain
                                        <br/>
                                        Bisa di isi dengan link nomor kontak seperti
                                        <br/>
                                        <br/>
                                        <span className="font-weight-bold"> 
                                            10.194.58.254/tudinan/nomor.php
                                        </span>
                                    </p>
                                )
                            }}
                            value={text}
                            setValue={setText}
                        />

                        <InputImage
                            item={{
                                name: "file",
                            }}
                            value={file}
                            setValue={setFile}
                        />

                        <SelectCategory
                            value={category_id}
                            setValue={setCategoryId}
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
