import React, { useState } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

import EditNav from "../../../components/CardCRUD/EditNav";
import InputText from "../../../components/FormInput/InputText";
import InputCkEditor from "../../../components/FormInput/InputCkEditor";
import InputImage from "../../../components/FormInput/InputImage";

import SelectCategory from "./SelectCategory";

export default function FormEdit({ item, setIsEditMode, refreshData }) {
    const [name, setName] = useState(item.name);
    const [text, setText] = useState(item.text);
    const [category_id, setCategoryId] = useState(item.category_id);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState();
    
    const BASE_URL = location.origin + "/data/contents/" + item.contents_id;

    let store = (event) => {
        event.preventDefault();

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        const formData = new FormData();

        formData.append("name", name);
        formData.append("text", text);
        formData.append("file", file);
        formData.append("category_id", category_id);

        setIsLoading(true);
        axios
            .post(BASE_URL, formData, config)
            .then(function (data) {
                if (data.data == true) {
                    refreshData();
                } else {
                    alert("Gagal edit data !");
                }
                setFile(null);
                setText("");

                setIsLoading(false);
            })
            .catch(function (error) {
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

                    <InputCkEditor
                        item={{ name: "description" }}
                        value={text}
                        setValue={setText}
                    />

                    <SelectCategory
                        value={category_id}
                        setValue={setCategoryId}
                    />

                    <InputImage
                        item={{
                            name: "file",
                            srcBefore:
                                location.origin +
                                "/storage/images/" +
                                item.file,
                        }}
                        value={file}
                        setValue={setFile}
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
