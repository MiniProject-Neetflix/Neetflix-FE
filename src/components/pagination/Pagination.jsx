import React from "react";
import "./Pagination.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ page, setPage, setLoading }) => {
  return (
    <div className="pagination">
      <IoIosArrowBack
        className="pagination-icon"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 800);
          }
        }}
      />
      <p>{page}</p>
      <IoIosArrowForward
        className="pagination-icon"
        onClick={() => {
          setPage(page + 1);
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 800);
        }}
      />
    </div>
  );
};

export default Pagination;
