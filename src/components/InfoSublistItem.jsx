/**
 * The InfoSublistItem component contains the information for each section of the handbook in the Info component.
 * @param { contentLabel,
  contentMP4,
  contentText,
  setContentMP4,
  setContentText,
  setContentLabel, } props
 */
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
