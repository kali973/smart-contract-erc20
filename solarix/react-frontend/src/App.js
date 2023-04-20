import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListEmployeeComponent from './components/employe/ListEmployeeComponent';
import HeaderComponent from './components/employe/HeaderComponent';
import FooterComponent from './components/employe/FooterComponent';
import CreateEmployeeComponent from './components/employe/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/employe/ViewEmployeeComponent';

function App() {
    return (
        <div>
            <Router>
                <HeaderComponent/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={ListEmployeeComponent}></Route>
                        <Route path="/employees" component={ListEmployeeComponent}></Route>
                        <Route path="/add-employee/:id" component={CreateEmployeeComponent}></Route>
                        <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
                        {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                    </Switch>
                </div>
                <FooterComponent/>
            </Router>
        </div>

    );
}

export default App;
