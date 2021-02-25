import React, { Fragment,useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import axios from "axios";

export default function TextSetting({text="",style={},className="",placeholder=""}) {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(location.origin + "/api/getsetting/"+text).then((resp) => {
            setValue(resp.data.value);
            setIsLoading(false);
        });
    }, []);

    return (
        <Fragment>
            <span>
            {value ? value:(
                <Fragment>
                    {
                        (placeholder&&!isLoading) && placeholder
                    }
                </Fragment>
            )}
            </span>
        </Fragment>
    );
}
