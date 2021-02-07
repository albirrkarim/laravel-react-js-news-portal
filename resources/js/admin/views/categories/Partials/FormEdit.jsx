import React, { useState, Fragment, useRef } from "react";
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
    Button,
    AppBar,
    Tabs,
    Tab,
    makeStyles
} from "@material-ui/core";

import DeleteButton from "../../../components/CardCRUD/DeleteButton";
import ShareLink from "../../../components/ShareLink";

import {
    normalize,
    makeName,
    str_limit,
    alphaNumeric
} from "../../../utils/helper";
import EditNav from "../../../components/CardCRUD/EditNav";
import InputText from "../../../components/FormInput/InputText";
import InputCkEditor from "../../../components/FormInput/InputCkEditor";
import InputImage from "../../../components/FormInput/InputImage";

export default function FormEdit({ item,setIsEditMode, refreshData }) {
    const [name, setName] = useState(item.name);

    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = location.origin + "/data/categories/" + item.category_id;

    let store = event => {
        event.preventDefault();

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        const formData = new FormData();

        formData.append("name", name);

        setIsLoading(true);
        axios
            .post(BASE_URL, formData, config)
            .then(function(data) {
                if (data.data == true) {
                    refreshData();
                } else {
                    alert("Gagal edit data !");
                }
                setIsLoading(false);
            })
            .catch(function(error) {
                setIsLoading(false);
                alert(error.message);
            });
    };

    return (
        <form method="post" onSubmit={store} encType="multipart/form-data">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <InputText
                        item={{ name: "name" }}
                        value={name}
                        setValue={setName}
                    />
                </Grid>
            </Grid>

            <EditNav
                isLoading={isLoading}
                onCancel={() => {
                    setIsEditMode(false);
                }}
            />
        </form>
    );
}
