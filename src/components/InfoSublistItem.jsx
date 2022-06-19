import React from "react";

const InfoSublistItem = ({
  contentLabel,
  contentMP4,
  contentText,
  setContentMP4,
  setContentText,
  setContentLabel,
}) => {
  return (
    <li
      onClick={() => {
        setContentMP4(contentMP4);
        setContentText(contentText);
        setContentLabel(contentLabel);
      }}
    >
      <span>{contentLabel}</span>
    </li>
  );
};

export default InfoSublistItem;
