import React, { useState, Fragment } from "react";
import { IconButton } from "@material-ui/core";

import { FiHelpCircle, FiXCircle } from "react-icons/fi";

export default ({ text, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="mt-3 mb-3 p-2  border border-primary rounded">
            {children}

            <Fragment>
                <IconButton
                    size="small"
                    color="secondary"
                    onClick={() => {
                        setOpen(!open);
                    }}
                >
                    {open ? <FiXCircle /> : <FiHelpCircle />}
                </IconButton>

                {open && <div className="mb-2">{text}</div>}
            </Fragment>
        </div>
    );
};
