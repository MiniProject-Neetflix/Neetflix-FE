import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import Button from "./Button";
import API from "../../config/api";
import jwt from "jwt-decode";

const TextEditor = ({
  userId,
  movieId,
  data,
  title,
  setComment,
  rating,
  dataMovie,
  genre,
  casting,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [text, setText] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isReviewed, setIsReviewed] = useState(false);
  console.log(isReviewed);

  const movieID = localStorage.getItem("MovieID");
  const idUser = localStorage.getItem("token");
  const decode = jwt(idUser);

  const getOneReview = async () => {
    const results = await API.getOneReview(movieID, decode.id);
    if (results) {
      setIsReviewed(results.data.isReviewed);
    }
  };

  const onEditorStateChange = (e) => {
    setEditorState(e);
    setText(draftToHtml(convertToRaw(e.getCurrentContent())));
    if (text.length === 0) {
      setIsDisabled(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const results = await API.createComment(
      userId,
      movieId,
      data,
      title,
      text,
      rating
    );
    if (results) {
      setComment(results.data.filter((el) => el.movieId === parseInt(movieId)));
    }

    if (isReviewed === false) {
      const resultsReview = await API.createReview({
        userId: userId,
        movieId: movieId,
        title: dataMovie.original_title,
        image: dataMovie.backdrop_path,
        year: dataMovie.release_date,
        duration: dataMovie.runtime,
        genre: genre.name,
        casting: casting
          .slice(0, 3)
          .map((el) => el.name)
          .join(", "),
        description: dataMovie.overview,
        rating: dataMovie.vote_average,
        isReviewed: true,
      });
      if (resultsReview) {
        console.log(resultsReview);
      } else {
        return;
      }
    }
  };

  useEffect(() => {
    getOneReview();
  }, []);

  return (
    <>
      <div className="text-editor">
        <form onSubmit={onSubmit}>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassname="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
          <div className="button">
            <Button
              classButton={"secondary"}
              label="Submit"
              disabled={isDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default TextEditor;
