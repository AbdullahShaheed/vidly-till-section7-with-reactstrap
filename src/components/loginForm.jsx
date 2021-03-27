import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import ToolTip from "./common/tooltip";

export default class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  //schema doesn't have to be part of the state because it's not supposed to change
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Call the server
    console.log("Submitted");
    this.props.history.replace("/");
  };

  render() {
    return (
      <>
        <h1>Login</h1>
        <div className="row">
          <div className="col"></div>
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("username", "Username")}
              <ToolTip target="username" tip="Your email address" />

              {this.renderInput("password", "Password", "password")}
              <ToolTip target="password" tip="Password to use in this app" />

              {this.renderButton("Login")}
            </form>
          </div>
          <div className="col"></div>
        </div>
      </>
    );
  }
}
