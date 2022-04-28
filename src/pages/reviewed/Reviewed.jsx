import React, { useEffect, useState } from "react";
import "./Reviewed.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import Pagination from "../../components/pagination/Pagination";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import API from "../../config/api";
import jwt from "jwt-decode";
import Fallback from "../../components/Fallback/Fallback";

const MyList = () => {
  const [dataReviewed, setDataReviewed] = useState([]);
  const userId = localStorage.getItem("token");
  const decode = jwt(userId);

  const getAllReviewed = async () => {
    const results = await API.getAllReview();
    if (results) {
      setDataReviewed(results.data.filter((el) => el.userId === decode.id));
    }
  };

  useEffect(() => {
    getAllReviewed();
  }, []);

  console.log(dataReviewed);

  return (
    <>
      <Navbar activeReviewed={"active"} />
      <div className="reviewed">
        <div className="reviewed-content">
          <MainTitle>Reviewed</MainTitle>
          <div className="reviewed-data">
            {dataReviewed.length === 0 && <Fallback>No Reviewed Yet.</Fallback>}
            {dataReviewed.map((el) => {
              return (
                <MyListFilm
                  key={el.id}
                  image={el.image}
                  title={el.title}
                  year={el.year}
                  duration={el.duration}
                  genre={el.genre}
                  casting={el.casting}
                  description={el.description}
                  rating={el.rating}
                  disabledDelete={"disabledDelete"}
                />
              );
            })}
          </div>
        </div>
        {dataReviewed.length > 5 && <Pagination />}
        <Footer />
      </div>
    </>
  );
};

export default MyList;
