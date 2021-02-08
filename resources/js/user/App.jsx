import React, { Fragment } from "react";
import { useRoutes } from "react-router-dom";

import routes from "./routes";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './Components/GlobalStyles';
import theme from './Theme';

const App = () => {
    const routing = useRoutes(routes);

    return (
	    <ThemeProvider theme={theme}>
	      <GlobalStyles />
	      {routing}
	    </ThemeProvider>
	 );
};

export default App;
