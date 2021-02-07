import React, { useState, Fragment } from "react";

import axios from "axios";
import FromEdit from "../FormEdit";
import EditNav from "./EditNav";

import { normalize } from "../../utils/helper";

export default function CardEdit({
    url,
    name = "",
    arrInput,
    value,
    setValue,
    onCancel,
    onSuccess,
    onFail
}) {
    const [isLoading, setIsLoading] = useState(false);

    let store = event => {
        event.preventDefault();

        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };

        const formData = new FormData();

        for (let i = 0, len = arrInput.length; i < len; i++) {
            if (arrInput[i].type == "url_youtube") {
                formData.append(arrInput[i].name, normalize(value[i]));
            } else {
                formData.append(arrInput[i].name, value[i]);
            }
        }

        setIsLoading(true);
        axios
            .post(url, formData, config)
            .then(function(resp) {
                onSuccess(resp.data);
                setIsLoading(false);
            })
            .catch(function(error) {
                onFail();
                setIsLoading(false);
                alert(error.message);
            });
    };

    return (
        <Fragment>
            <h5>Edit {name}</h5>
            <form method="post" onSubmit={store} encType="multipart/form-data">
                <FromEdit arr={arrInput} value={value} setValue={setValue} />

                <EditNav isLoading={isLoading} onCancel={onCancel} />
            </form>
        </Fragment>
    );
}
