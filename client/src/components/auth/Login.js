import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import * as actions from "../../actions";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(event) {
    let self = this;
    self.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    let self = this;
    event.preventDefault();
    self.props.login(self.state.email, self.state.password, () => {
      self.props.history.push("/createevent");
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)} className="ui form">
        Enter your email:
        <input type="text" name="email" onChange={this.onFieldChange} />
        Enter password:
        <input type="password" name="password" onChange={this.onFieldChange} />
        <Button type="submit" className="primary">
          Login
        </Button>
        <div>{this.props.errorMessage}</div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}

export default connect(
  mapStateToProps,
  actions
)(Login);
