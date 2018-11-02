import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import * as actions from "./actions";
import "./App.css";
import CreateEvent from "./components/feature/CreateEvent";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}

  render() {
    return (
      <Router className="ui container">
        <div>
          <header className="App-header">
            <Grid cols={3}>
              <Grid.Row>
                <Grid.Column width={4}>
                  <h4>
                    <Link to="/signup"> Sign up</Link> /
                    <Link to="/"> Login</Link>
                  </h4>
                </Grid.Column>
                <Grid.Column width={8}>
                  <h1 className="App-title">Event Creation</h1>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4>
                    <Logout />
                  </h4>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </header>
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/createevent" component={CreateEvent} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  actions
)(App);
