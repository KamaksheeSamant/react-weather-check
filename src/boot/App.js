//Entry Point for the App

import React, { Component } from 'react';
import Toolbar from '../common/components/Toolbar/Toolbar';
import Drawer from '../common/components/Drawer/Drawer';
import ShadowOffset from '../common/components/Drawer/ShadowOffset';
import { BrowserRouter, Route } from 'react-router-dom'
import Aboutus from '../container/AboutusContainer/Aboutus';
import Setting from '../container/SettingContainer/Setting';
import WeatherRoster from '../container/WeatherRosterContainer/WeatherRoster';

class App extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,// status of drawer visibility
      hasError: false
    };
  }

  //Main Error Boundry
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  // To toggle the drawer visibility
  drawerToggler = () => {
    this.setState((prevState) => {
      return {
        drawerOpen: !prevState.drawerOpen
      };
    })
  }
  // to close the drawer
  closeDrawer = () => {
    this.setState({
      drawerOpen: false
    });
  }

  render() {
    return (
      <div className="App" style={{ height: '100%' }}>
        

          <Toolbar drawerToggler={this.drawerToggler} />
          <Drawer isDrawerOpen={this.state.drawerOpen} />

          {this.state.drawerOpen &&// as visibility of shadowoffset is optional
            <React.Fragment>
              <ShadowOffset closeDrawer={this.closeDrawer} />
            </React.Fragment>
          }

          {(this.state.hasError) ?
            <h1>Something Went Wrong !</h1>
            :
            <BrowserRouter>
              <div>
                <Route exact path="/" component={WeatherRoster} />
                <Route path="/SETTINGS" component={Setting} />
                <Route path="/HOME" component={WeatherRoster} />
                <Route path="/ABOUT_US" component={Aboutus} />
              </div>
            </BrowserRouter>}
      </div>
    );
  }
}

export default App;
