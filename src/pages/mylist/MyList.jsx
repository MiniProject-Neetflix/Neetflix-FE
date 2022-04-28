import React, { useEffect, useState } from "react";
import "./MyList.scss";
import Navbar from "../../components/navbar/Navbar";
import MyListFilm from "../../components/myListFilm/MyListFilm";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/footer/Footer";
import MainTitle from "../../components/MainTitle/MainTitle";
import Pagination from "../../components/pagination/Pagination";
import jwt from "jwt-decode";
import API from "../../config/api";
import Fallback from "../../components/Fallback/Fallback";

const MyList = () => {
  const [list, setList] = useState([]);
  const [pages, setPages] = useState(0);
  const token = localStorage.getItem("token");

  const getMylist = async () => {
    const decode = jwt(token);
    const results = await API.getOneUser(decode.id);
    if (results) {
      setList(results.data.myLists);
    }
  };

  useEffect(() => {
    getMylist();
  }, []);

  return (
    <>
      <Navbar activeMyList={"active"} />
      <div className="mylist">
        <div className="mylist-content">
          <MainTitle>My List</MainTitle>
          <div className="my-list-data">
            {list.length === 0 && <Fallback>No Movie List</Fallback>}
            {list.map((el) => (
              <MyListFilm
                key={el.id}
                movieId={el.movieId}
                image={el.image}
                title={el.title}
                year={el.year}
                duration={el.duration}
                genre={el.genre}
                casting={el.casting}
                description={el.description}
                rating={el.rating}
              />
            ))}
          </div>
        </div>
        {list.length > 5 && <Pagination />}
        <Footer />
      </div>
    </>
  );
};

export default MyList;
