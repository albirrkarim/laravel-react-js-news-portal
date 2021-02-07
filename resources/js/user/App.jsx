import React, { Fragment } from "react";
import { useRoutes } from "react-router-dom";

import routes from "./routes";

const App = () => {
    const routing = useRoutes(routes);

    return <Fragment>{routing}</Fragment>;
};

export default App;
