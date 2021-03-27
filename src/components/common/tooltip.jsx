import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const ToolTip = ({ target, tip }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Tooltip
      isOpen={open}
      target={target}
      toggle={toggle}
      placement="bottom-start"
    >
      {tip}
    </Tooltip>
  );
};

export default ToolTip;
