import React from "react";
import {
  MdShoppingCart,
  MdHome,
  MdPerson,
  MdAttachMoney,
  MdFilter7,
  MdWeb,
  MdDelete,
  MdEdit,
  MdSettings,
  MdStore,
  MdDirectionsCar,
  MdInsertDriveFile
} from "react-icons/md";
import {
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillFileWord,
  AiFillFileImage,
  AiOutlineQrcode
} from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import "./app-icon.scss";

export interface AppIconPropsInterface {
  name: string;
  color?: string;
}

export const AppIcon: React.FC<AppIconPropsInterface> = (
  props: AppIconPropsInterface
) => {
  let icon: any;
  const iconColor = props.color ? props.color : "#000000";
  switch (props.name) {
    case "shopping-kart":
      icon = <MdShoppingCart color={iconColor} />;
      break;
    case "house":
      icon = <MdHome color={iconColor} />;
      break;
    case "driver":
      icon = <MdDirectionsCar color={iconColor} />;
      break;
    case "client":
      icon = <MdPerson color={iconColor} />;
      break;
    case "agent":
      icon = <MdStore color={iconColor} />;
      break;
    case "customer-app":
      icon = <MdWeb color={iconColor} />;
      break;
    case "wallet":
      icon = <MdAttachMoney color={iconColor} />;
      break;
    case "price":
      icon = <MdFilter7 color={iconColor} />;
      break;
    case "qrcode":
      icon = <AiOutlineQrcode color={iconColor} />;
      break;
    case "user-setting":
      icon = <MdPerson color={iconColor} />;
      break;
    case "faq":
      icon = <FaQuestionCircle color={iconColor} />;
      break;
    case "system-setting":
      icon = <MdSettings color={iconColor} />;
      break;
    case "delete":
      icon = <MdDelete color={iconColor} />;
      break;
    case "edit":
      icon = <MdEdit color={iconColor} />;
      break;
    case "png":
    case "jpeg":
      icon = <AiFillFileImage color={iconColor} />;
      break;
    case "doc":
    case "docx":
      icon = <AiFillFileWord color={iconColor} />;
      break;
    case "pdf":
      icon = <AiFillFilePdf color={iconColor} />;
      break;
    case "xls":
    case "xlsx":
      icon = <AiFillFileExcel color={iconColor} />;
      break;
    case "txt":
      icon = <MdInsertDriveFile color={iconColor} />;
    default:
      icon = <MdEdit color={iconColor} />;
      break;
  }
  return icon;
};
