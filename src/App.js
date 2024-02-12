import React from "react";
import Login from "./pages/login/Login";
import {getToken} from "./util/TokenUtil";
import Dashboard from "./pages/dashboard/Dashboard";

class App extends React.Component{
    render() {
        return(
            <React.Fragment>
                {getToken() ?
                    <Dashboard/> :
                    <Login/>
                }
            </React.Fragment>
        )
    }
}

export default App;
