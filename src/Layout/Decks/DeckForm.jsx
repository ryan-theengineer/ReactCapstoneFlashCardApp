import React from "react";
import { Link } from "react-router-dom";

export default function DeckForm({
  formName,
  handleSubmit,
  handleChange,
  deck,
}) {
  const path = deck.id ? `/decks/${deck.id}` : "/";

  return (
    <React.Fragment>
      <h1>{formName}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="name"
            onChange={handleChange}
            value={deck.name}
            placeholder="Deck Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            className="form-control"
            id="description"
            onChange={handleChange}
            value={deck.description}
            placeholder="Description"
          />
        </div>
        <Link to={path} type="cancel" className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
