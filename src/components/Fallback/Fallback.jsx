import React from "react";
import "./Fallback.scss";
import Upload from "../../assets/upload.png";

const Fallback = (props) => {
  return (
    <div className={props.className || "fallback-error"}>
      <div className={"fallback-content"}>
        {props.noImage || (
          <img width={"350px"} height={"350px"} src={Upload} alt="" />
        )}
        <p>{props.children || "No Data"}</p>
      </div>
    </div>
  );
};

export default Fallback;
