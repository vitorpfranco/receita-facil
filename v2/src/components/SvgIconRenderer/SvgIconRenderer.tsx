import React from "react";
import style from "./style.module.scss";

const SVGIconRenderer: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: icon }}
      className={style.iconImage}
    />
  );
};

export default SVGIconRenderer;
