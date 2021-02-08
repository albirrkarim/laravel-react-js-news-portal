import React, { useState, Fragment, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { FaWhatsapp } from "react-icons/fa";
import { FiLink, FiLinkedin, FiTwitter } from "react-icons/fi";
import { BsX } from "react-icons/bs";

import CopyLink from "./CopyLink";
import ShareListItem from "./ShareListItem";

export default function ShareLink({
    name,
    link,
    customOpen = false,
    setOpenShare
}) {
    const [openMenu, setOpenMenu] = useState(false);
    const [getLinkOpened, setGetLinkOpened] = useState(false);

    useEffect(() => {
        if (customOpen) {
            shareNative();
        }
    }, []);

    function shareNative(event) {
        if (navigator.share) {
            navigator
                .share({
                    title: name,
                    text: `${name} \n`,
                    url: link
                })
                .then(() => {
                    if (customOpen) {
                        setOpenShare(false);
                    }
                    // console.log("Successful share");
                })
                .catch(error => {
                    if (customOpen) {
                        setOpenShare(false);
                    }
                    // console.log("Error sharing", error);
                });
        } else {
            setOpenMenu(!openMenu);
        }
    }

    const arrSosmed = [
        {
            icon: <FaWhatsapp />,
            url: `https://api.whatsapp.com/send?text=${link}`,
            title: "Whatsapp"
        },
        {
            icon: <FiTwitter />,
            url: `https://twitter.com/intent/tweet?text=${link}`,
            title: "Twitter"
        },
        {
            icon: <FiLinkedin />,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
            title: "LinkedIn"
        },
        {
            icon: <FiLink />,
            onClick: () => {
                setGetLinkOpened(!getLinkOpened);
            },
            title: "CopyLink"
        }
    ];

    return (
        <div>
            {customOpen == false && (
                <Button
                    onClick={shareNative}
                    variant={openMenu ? "contained" : "outlined"}
                    size="medium"
                    color="primary"
                    endIcon={openMenu ? <BsX /> : null}
                >
                    Share
                </Button>
            )}

            {openMenu && (
                <Fragment>
                    <Grid container className="mt-2">
                        {arrSosmed.map((item, idx) => (
                            <ShareListItem key={idx} {...item} />
                        ))}
                    </Grid>

                    {getLinkOpened && <CopyLink link={link} />}
                </Fragment>
            )}
        </div>
    );
}
