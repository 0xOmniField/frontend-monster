import React from "react";
import ImageButton from "./ImageButton";
import playButtonImage from "../../images/Buttons/Play/play.png";
import playButtonHoverImage from "../../images/Buttons/Play/play_hover.png";
import playButtonClickImage from "../../images/Buttons/Play/play_click.png";

interface Props {
  onClick: () => void;
  text?: string;
}

const PlayButton = ({ onClick, text }: Props) => {
  return text ? (
    <div className=" relative cursor-pointer" onClick={onClick}>
      <div
        className="
                    sm:absolute
                    text-black
                    font-bold
                    bg-[#D9CFE6]
                    sm:-translate-y-1/2
                    sm:-translate-x-1/2
                    "
        style={{
          textWrap: "nowrap",
          padding: "10px 23px",
          clipPath:
            "polygon(5% 0%, 100% 0%, 100% 10%, 100% 90%, 95% 100%, 10% 100%, 0% 100%, 0% 10%)",
        }}
      >
        {text}
      </div>
    </div>
  ) : (
    <ImageButton
      isDisabled={false}
      defaultImagePath={playButtonImage}
      hoverImagePath={playButtonHoverImage}
      clickedImagePath={playButtonClickImage}
      disabledImagePath={playButtonImage}
      onClick={onClick}
    />
  );
};

export default PlayButton;
