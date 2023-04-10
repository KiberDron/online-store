import React, { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import HelpAuth from "./modals/helpAuth";

function Help() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <HelpIcon
        onClick={() => setVisible(true)}
        className="position-fixed"
        style={{
          left: "97%",
          bottom: "3%",
          scale: "2",
          cursor: "pointer",
          color: "#0D6EFD",
        }}
      />
      <HelpAuth show={visible} onHide={() => setVisible(false)}></HelpAuth>
    </>
  );
}

export default Help;
