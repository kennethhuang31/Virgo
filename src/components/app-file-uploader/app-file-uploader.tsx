import React, { useState } from "react";
import "./app-file-uploader.scss";
import { AppIcon, AppButton } from "components";

interface AppFileUploaderPropsInterface {
  text?: string;
  uploaderStyle?: string;
  handleFileUpload: (file: File) => void;
}

export const AppFileUploader: React.FC<AppFileUploaderPropsInterface> = (
  props: AppFileUploaderPropsInterface
) => {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setExtension] = useState("");

  const style =
    props.uploaderStyle === undefined
      ? "app-layout app-layout_horizontal uploader"
      : `app-layout app-layout_horizontal uploader ${props.uploaderStyle}`;

  const handleFileChange = (event: any) => {
    const fileList: FileList = event.target.files;
    const selectedFile: File = fileList[0];
    setFileName(selectedFile.name);
    const fileExtension = selectedFile.name.split(".").pop();
    setExtension(fileExtension === undefined ? "" : fileExtension);
    props.handleFileUpload(selectedFile);
  };

  const triggerUpload = () => {
    const uploaderEle = document.getElementById("hidden-input");
    uploaderEle?.click();
  };

  return (
    <div className={style}>
      <AppButton
        type="add"
        disabled={false}
        btnType="button"
        text={props.text}
        onClick={triggerUpload}
      />
      <span className="uploader-name">{fileName}</span>
      {fileName.trim() !== "" && (
        <div className="uploader-icon">
          <AppIcon name={fileExtension} />
        </div>
      )}
      <input
        id="hidden-input"
        className="hidden-input"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
