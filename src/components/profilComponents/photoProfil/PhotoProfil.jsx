import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./PhotoProfil.scss";

const PhotoProfil = (props) => {
  const { image, inputFileHandler } = props;
  console.log(image);

  return (
    <div className="profil-img">
      <img
        src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
        alt="err"
      />
      <div className="file-upload">
        <label htmlFor="fusk">
          <AiOutlineCloudUpload className="file-icon" /> Upload Foto
        </label>

        <input id="fusk" type="file" onChange={inputFileHandler} name="photo" />
      </div>
    </div>
  );
};

export default PhotoProfil;
