import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    Hidden,
    List,
    Typography,
    makeStyles,
} from "@material-ui/core";

import TimelineOutlinedIcon from "@material-ui/icons/TimelineOutlined";
import AccountBalanceOutlinedIcon from "@material-ui/icons/AccountBalanceOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import {
    FiAlignLeft,
    FiFile,
    FiGrid,
    FiUser,
    FiMoreHorizontal,
} from "react-icons/fi";

import NavItem from "./NavItem";

import Profile from "./Profile";

const items = [
    {
        href: "/app/news",
        icon: FiAlignLeft,
        title: "News",
    },

    {
        href: "/app/contents",
        icon: FiFile,
        title: "Contents",
    },

    {
        href: "/app/categories",
        icon: FiGrid,
        title: "Categories",
    },

    {
        href: "/app/settings",
        icon: FiMoreHorizontal,
        title: "Settings",
    },

    {
        href: "/app/account",
        icon: FiUser,
        title: "Account",
    },
];

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256,
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: "calc(100% - 64px)",
    },
    avatar: {
        cursor: "pointer",
        width: 64,
        height: 64,
    },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const content = (
        <Box height="100%" display="flex" flexDirection="column">
            <Profile classes={classes} />
            <Divider />
            <Box p={2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box flexGrow={1} />
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.mobileDrawer }}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.desktopDrawer }}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
    onMobileClose: () => {},
    openMobile: false,
};

export default NavBar;
