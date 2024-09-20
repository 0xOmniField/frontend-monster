import React, { useEffect } from "react";
import "../MainMenuProgram.css";
import image_00 from "../../images/Animations/Programs/CrysTara/CrysTara_00.png";
import image_01 from "../../images/Animations/Programs/CrysTara/CrysTara_01.png";
import image_02 from "../../images/Animations/Programs/CrysTara/CrysTara_02.png";
import image_03 from "../../images/Animations/Programs/CrysTara/CrysTara_03.png";
import image_04 from "../../images/Animations/Programs/CrysTara/CrysTara_04.png";
import image_05 from "../../images/Animations/Programs/CrysTara/CrysTara_05.png";
import image_06 from "../../images/Animations/Programs/CrysTara/CrysTara_06.png";
import image_07 from "../../images/Animations/Programs/CrysTara/CrysTara_07.png";
import image_08 from "../../images/Animations/Programs/CrysTara/CrysTara_08.png";
import image_09 from "../../images/Animations/Programs/CrysTara/CrysTara_09.png";
import image_10 from "../../images/Animations/Programs/CrysTara/CrysTara_10.png";
import image_11 from "../../images/Animations/Programs/CrysTara/CrysTara_11.png";
import image_12 from "../../images/Animations/Programs/CrysTara/CrysTara_12.png";
import image_13 from "../../images/Animations/Programs/CrysTara/CrysTara_13.png";
import image_14 from "../../images/Animations/Programs/CrysTara/CrysTara_14.png";
import image_15 from "../../images/Animations/Programs/CrysTara/CrysTara_15.png";
import image_16 from "../../images/Animations/Programs/CrysTara/CrysTara_16.png";
import image_17 from "../../images/Animations/Programs/CrysTara/CrysTara_17.png";
import image_18 from "../../images/Animations/Programs/CrysTara/CrysTara_18.png";
import image_19 from "../../images/Animations/Programs/CrysTara/CrysTara_19.png";
import image_20 from "../../images/Animations/Programs/CrysTara/CrysTara_20.png";
import image_21 from "../../images/Animations/Programs/CrysTara/CrysTara_21.png";
import image_22 from "../../images/Animations/Programs/CrysTara/CrysTara_22.png";
import image_23 from "../../images/Animations/Programs/CrysTara/CrysTara_23.png";

interface Props {
  showAnimation: boolean;
}

const CrysTara = ({ showAnimation }: Props) => {
  const animationName = "CrysTaraFrames";
  const images = [
    image_00,
    image_01,
    image_02,
    image_03,
    image_04,
    image_05,
    image_06,
    image_07,
    image_08,
    image_09,
    image_10,
    image_11,
    image_12,
    image_13,
    image_14,
    image_15,
    image_16,
    image_17,
    image_18,
    image_19,
    image_20,
    image_21,
    image_22,
    image_23
  ];

  const generateAnimation = () => {
    if (document.getElementById(animationName)) {
      return;
    }

    const keyframes = [...images, images[0]]
      .map((img, index) => {
        const percentage = (index / images.length) * 100;
        return `${percentage}% { background-image: url(${img}); }`;
      })
      .join(" ");

    const style = document.createElement("style");
    style.id = animationName;
    style.innerHTML = `
    @keyframes ${animationName} {
        ${keyframes}
    }`;
    document.head.appendChild(style);
  };

  useEffect(() => {
    generateAnimation();
  }, []);

  return (
    <>
      {images.map((image, index) => (
        <link key={index} rel="preload" href={image} as="image" />
      ))}
      {
        <div
          className="main-bot-program-image"
          style={
            showAnimation
              ? { animation: `${animationName} 2s steps(24) infinite` }
              : { backgroundImage: `url('${images[0]}')` }
          }
        />
      }
    </>
  );
};

export default CrysTara;
