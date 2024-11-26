import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForm({ heading = "Enter", mode, showAlert }) {
  const [text, setText] = useState("");
  let disabled = true;
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    showAlert("Text has been converted into Uppercase!", "success");
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    showAlert("Text has been converted into Lowercase!", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    showAlert("Text has been spoke!", "success");
  };

  const HandleclearClick = () => {
    let newText = "";
    setText(newText);
    showAlert("Text has been cleared!", "success");
  };

  const HandleCopy = () => {
    navigator.clipboard.writeText(text);
    showAlert("Text has been copied!", "success");
  };

  const HandleExtraSpace = () => {
    //let newText = text.split(/[ ]+/);
    //setText(newText.join(" "));
    setText(text.replace(/\W+/g, " "));
    showAlert("Remove extra space from text!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  return (
    <>
      <div
        className="container"
        style={{ color: mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            value={text}
            onChange={handleOnChange}
            rows="8"
            style={{
              backgroundColor: mode === "dark" ? "#13466e" : "white",
              color: mode === "dark" ? "white" : "#042743",
            }}
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={speak}
        >
          Speak
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={HandleclearClick}
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={HandleCopy}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={HandleExtraSpace}
        >
          Remove Extra Space
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: mode === "dark" ? "white" : "#042743" }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length === 0 ? "Please write someting" : text}</p>
      </div>
    </>
  );
}

TextForm.propTypes = {
  heading: PropTypes.string,
};
