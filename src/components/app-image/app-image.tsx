import React from "react";
import Image from "react-bootstrap/Image";
import "./app-image.scss";

export interface ImagePropsInterface {
  shape?: string;
  url: string;
  scalable?: boolean;
}

export const AppImage: React.FC<ImagePropsInterface> = (
  props: ImagePropsInterface
) => {
  const imageProp: any = {};
  switch (props.shape) {
    case "circle":
      imageProp.isCircle = true;
      break;
    case "rounded":
      imageProp.isRounded = true;
      break;
    case "thumbnail":
      imageProp.isThumbnail = true;
      break;
  }
  if (props.scalable) {
    imageProp.isFluid = true;
  }
  return (
    <Image
      src={props.url}
      rounded={imageProp.isRounded}
      roundedCircle={imageProp.isCircle}
      thumbnail={imageProp.isThumbnail}
      fluid={imageProp.isFluid}
    />
  );
};

class ImageProp {
  isRounded: boolean;
  isCircle: boolean;
  isThumbnail: boolean;
  isFluid: boolean;
}
