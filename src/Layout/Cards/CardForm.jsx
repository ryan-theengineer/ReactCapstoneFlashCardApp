import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({
  formName,
  handleSubmit,
  handleChange,
  card,
  deckId
}) {

// As the buttons are different between Edit and Add Card, these two variables change the name accordingly.
// This lets the component be flexible.

const buttonLink = (formName === "Edit Card") ? "Cancel" : "Done"
const submitLink = (formName === "Edit Card") ? "Submit" : "Save"
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Front</label>
          <textarea
            type="text"
            name="front"
            className="form-control"
            id="front"
            aria-describedby="front"
            onChange={handleChange}
            value={card.front}
            placeholder="Front side of card"
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            name="back"
            className="form-control"
            id="back"
            onChange={handleChange}
            value={card.back}
            placeholder="Back side of card"
          />
        </div>
        <Link to={`/decks/${deckId}`} type="cancel" className="btn btn-secondary">
          {buttonLink}
        </Link>
        <button type="submit" className="btn btn-primary">
          {submitLink}
        </button>
      </form>
    </React.Fragment>
  );
}
