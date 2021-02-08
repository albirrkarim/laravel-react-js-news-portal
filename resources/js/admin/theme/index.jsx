import { createMuiTheme, colors } from "@material-ui/core";
import shadows from "./shadows";
import typography from "./typography";

const theme = createMuiTheme({
    palette: {
        background: {
            dark: "#F4F6F8",
            default: colors.common.white,
            paper: colors.common.white,
        },
        primary: {
            main: "rgb(228,35,19)",
        },
        secondary: {
            main: "rgb(228,35,19)",
        },
        text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600],
        },
    },
    shadows,
    typography,
});

export default theme;
