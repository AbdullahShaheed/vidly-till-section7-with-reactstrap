import React, { useState } from "react";
import Joi from "joi-browser";
import emailjs from "emailjs-com";
import { Spinner } from "reactstrap";
import config from "../config.json";
import MyAlert from "./alert";
import Form from "./common/form";

class ContactUs extends Form {
  state = {
    data: { from_name: "", user_email: "", message: "" },
    errors: {},
    alertMessage: "",
    color: "",
    visible: false,
    spinnerVisible: false,
  };

  schema = {
    from_name: Joi.optional(),
    user_email: Joi.string().email().required(),
    message: Joi.string().required(),
  };

  sendEmail = async (e) => {
    e.preventDefault();

    await emailjs.sendForm(
      config.mailService.serviceId,
      config.mailService.templateId,
      e.target,
      config.mailService.userId
    );
  };

  doSubmit = async (e) => {
    this.setState({ spinnerVisible: true });
    try {
      await this.sendEmail(e);
      this.setState({
        visible: true,
        alertMessage: "Message sent successfully.",
        color: "success",
      });
    } catch (error) {
      this.setState({
        visible: true,
        alertMessage: "Something failed. Message couldn't be sent.",
        color: "danger",
      });
    } finally {
      this.setState({ spinnerVisible: false });
    }
  };
  render() {
    const { color, visible, alertMessage, spinnerVisible } = this.state;
    return (
      <>
        <div className="row">
          <div className="col">
            <p>
              Send us a message and it will be of interest and appriciation.
            </p>
          </div>
          <div className="col-sm-6 text-center">
            <form onSubmit={this.handleSubmit}>
              {this.renderUncontrolledInput("hidden", "to_name")}
              {this.renderUncontrolledInput("text", "from_name", "Your name..")}
              {this.renderUncontrolledInput(
                "text",
                "user_email",
                "Your email.."
              )}
              {this.renderTextArea("message", "Your message..")}
              {this.renderButton("Send")}
              {spinnerVisible && <Spinner color="primary" />}
            </form>
            <MyAlert
              isOpen={visible}
              color={color}
              alertMessage={alertMessage}
              dismiss={() => this.setState({ visible: false })}
            />
          </div>
          <div className="col"></div>
        </div>
      </>
    );
  }
}

export default ContactUs;
