import React from "react";

const UncontrolledInput = ({ error, ...rest }) => {
  return (
    <div className="form-group">
      <input {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default UncontrolledInput;
