import React, { Component } from "react";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";

class Logout extends Component {
  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      !_.isEmpty(this.props.authenticated) && (
        <Link to="/" onClick={this.handleLogout.bind(this)}>
          Logout
        </Link>
      )
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(
  mapStateToProps,
  actions
)(Logout);
