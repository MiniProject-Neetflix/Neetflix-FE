import "./Profil.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import API from "../../config/api";
import PhotoProfil from "../../components/profilComponents/photoProfil/PhotoProfil";
import EditProfil from "../../components/profilComponents/editProfil/EditProfil";

const Profil = () => {
  const [image, setImage] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );
  const [saveImage, setSaveimage] = useState(null);

  async function getOne() {
    let getOne = await API.getOneUser(1);
    if (getOne) {
      setImage(getOne.data.image);
    }
  }

  useEffect(() => {
    getOne();
  }, []);

  const inputFileHandler = (e) => {
    let uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveimage(uploaded);
  };

  const uploadImages = () => {
    API.updateProfile(saveImage, 1);
  };
  return (
    <>
      <Navbar className={"profilActive"} />
      <div className="profil">
        <div className="profil-background">
          <img src="https://i.ibb.co/RhNSKbM/profilbg.png" alt="" />
        </div>

        <div className="profil-box">
          <div className="profil-info">
            <h1>
              <span>|</span> Akun saya
            </h1>
            <div className="update-profil">
              <PhotoProfil
                image={`http://localhost:3001/storage/${image}`}
                inputFileHandler={inputFileHandler}
              />
              <EditProfil uploadImages={uploadImages} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Profil;
