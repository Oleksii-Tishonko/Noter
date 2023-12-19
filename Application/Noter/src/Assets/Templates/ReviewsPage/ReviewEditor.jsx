import React, { useEffect, useState } from "react";
import SelectRatingBar from "./SelectRatingBar";
import { set } from "lodash";

const ReviewEditor = () => {
   const [title, setTitle] = useState("");
   const [pros, setPros] = useState("");
   const [cons, setCons] = useState("");
   const [text, setText] = useState("");
   const [rating, setRating] = useState(0);
   const [titleValidationError, setTitleValidationError] = useState("");
   const [prosValidationError, setProsValidationError] = useState("");
   const [consValidationError, setConsValidationError] = useState("");
   const [textValidationError, setTextValidationError] = useState("");
   const [readyToSubmit, setReadyToSubmit] = useState(false);

   function validateField(value, setValidationError, isRequired) {
      if (value.length == 0 && isRequired) {
         setValidationError("This field is required");
         return;
      }
      if (value.length < 3 && value.length > 0) {
         setValidationError("This field must be at least 3 characters long");
         return;
      }
      setValidationError("");
   }

   function validateFields() {
      if (textValidationError === "" || textValidationError.startsWith("At least one field must be filled") || textValidationError.startsWith("Please rate product before submitting your review") || textValidationError.startsWith("A review must have a title") || textValidationError.startsWith("Please rate product before submitting your review")) {

         // set 'no fields filled' validation error
         if (pros.length < 1 && cons.length < 1 && text.length < 1) {
            setTextValidationError("At least one field must be filled: Pros, Cons or Review.");
            return false;
         }
         // remove 'no fields filled' validation error
         else if (textValidationError.startsWith("At least one field must be filled")) {
            setTextValidationError("");
         }

         // set 'no title' validation error
         if (title.length < 1) {
            setTextValidationError("A review must have a title.");
            return false;
         }
         // remove 'no title' validation error
         else if (textValidationError.startsWith("A review must have a title")) setTextValidationError("");

         // set 'no rating' validation error
         if (rating === 0) {
            setTextValidationError("Please rate product before submitting your review.");
            return false;
         }
         // remove 'no rating' validation error
         else if (textValidationError.startsWith("Please rate product before submitting your review")) setTextValidationError("");
         
      }
      if(titleValidationError !== "" || prosValidationError !== "" || consValidationError !== "") return false;
      if (textValidationError !== "" && !textValidationError.startsWith("At least one field must be filled") && !textValidationError.startsWith("Please rate product before submitting your review") && !textValidationError.startsWith("A review must have a title")) return false;
      return true;
   }

   useEffect(() => {
      if (title === "" && pros === "" && cons === "" && text === "") return;

      const isValidated = validateFields();

      setReadyToSubmit(isValidated);
   }, [title, pros, cons, text, rating]);

   function setProsValue(value) {
      setPros(value);
      validateField(value, setProsValidationError);
   }
   function setConsValue(value) {
      setCons(value);
      validateField(value, setConsValidationError);
   }
   function setTextValue(value) {
      setText(value);
      validateField(value, setTextValidationError);
   }
   function setTitleValue(value) {
      setTitle(value);
      validateField(value, setTitleValidationError, true);
   }

   return (
      <div className="reviewEditor">
         <div className="rating">
            <div className="header">Rating</div>
            <SelectRatingBar onRatingChange={setRating} />
         </div>
         <div className="textForm">
            <div className="Title">
               <div className="header">Title</div>
               <textarea className="input" onChange={(e) => setTitleValue(e.target.value)}></textarea>
               <div className="validationError">{titleValidationError}</div>
            </div>

            <div className="pros">
               <div className="header">Pros</div>
               <textarea className="input" onChange={(e) => setProsValue(e.target.value)}></textarea>
               <div className="validationError">{prosValidationError}</div>
            </div>

            <div className="cons">
               <div className="header">Cons</div>
               <textarea className="input" onChange={(e) => setConsValue(e.target.value)}></textarea>
               <div className="validationError">{consValidationError}</div>
            </div>
            <div className="text">
               <div className="header">Review</div>
               <textarea className="input" onChange={(e) => setTextValue(e.target.value)}></textarea>
               <div className="validationError">{textValidationError}</div>
            </div>
         </div>
         <button className="submit" disabled={!readyToSubmit}>
            Submit
         </button>
      </div>
   );
};

export default ReviewEditor;
