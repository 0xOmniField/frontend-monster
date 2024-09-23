import React from "react";
import ImageButton from "./ImageButton";
import confirmButtonImage from "../../images/Buttons/Confirm/confirm_new.png";
import confirmButtonHoverImage from "../../images/Buttons/Confirm/confirm_hv_new.png";
import confirmButtonClickImage from "../../images/Buttons/Confirm/confirm_click_new.png";
import "./ConfirmButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const ConfirmButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="confirm-button">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={confirmButtonImage}
        hoverImagePath={confirmButtonHoverImage}
        clickedImagePath={confirmButtonClickImage}
        disabledImagePath={confirmButtonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default ConfirmButton;
