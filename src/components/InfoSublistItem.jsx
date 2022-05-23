import React from "react";

const InfoSublistItem = ({
  contentLabel,
  contentGif,
  contentText,
  setContentGif,
  setContentText,
  setContentLabel,
}) => {
  return (
    <li
      onClick={() => {
        setContentGif(contentGif);
        setContentText(contentText);
        setContentLabel(contentLabel);
      }}
    >
      <span>{contentLabel}</span>
    </li>
  );
};

export default InfoSublistItem;
