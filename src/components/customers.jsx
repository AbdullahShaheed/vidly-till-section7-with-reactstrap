import React, { useState } from "react";
import MyAlert from "./alert";

const Customers = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <MyAlert
        isOpen={visible}
        dismiss={() => setVisible(false)}
        color="info"
        alertMessage="This is an info message"
      />
      <h1>Customers</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
          setVisible(true);
          setTimeout(() => {
            setVisible(false);
          }, 2000);
        }}
      >
        Show Alert
      </button>
    </>
  );
};

export default Customers;
