import React from "react";
import { Alert } from "reactstrap";

function MyAlert({ isOpen, dismiss, color, alertMessage }) {
  return (
    <Alert
      isOpen={isOpen}
      toggle={dismiss}
      color={color}
      fade={true}
    >
      {alertMessage}
    </Alert>
  );
}

export default MyAlert;
