import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

export default function Home() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadDecks() {
      try {
        const response = await listDecks(abortController.signal);
        setDecks(response);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadDecks();
    return () => {
      abortController.abort();
    };
  }, []);

  const clickHandler = (path) => {
    history.push(path);
  };

  async function deleteHandler(event) {
    event.preventDefault();
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      window.location.reload(true);
    }
    await deleteDeck(event.target.value);
  }

  const showDeck = decks.map((deck) => {
    return (
      <div className="card" key={deck.id}>
        <div className="card-body">
          <div className="row justify-content-between">
            <h5 className="card-title">{deck.name}</h5>
            <h2 style={{ fontSize: "15px" }}>{`${deck.cards.length} cards`}</h2>
          </div>
          <p className="card-text">{deck.description}</p>
          <div className="row justify-content-between">
            <div>
              <button
                className="btn btn-secondary"
                onClick={() => clickHandler(`/decks/${deck.id}`)}
              >
                View
              </button>
              <button
                className="btn btn-primary"
                onClick={() => clickHandler(`/decks/${deck.id}/study`)}
              >
                Study
              </button>
            </div>
            <button
              className="btn btn-danger"
              onClick={deleteHandler}
              value={deck.id}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });

  // This shows the decks on the page, along with the create deck button on top.
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-secondary btn-lg bit"
        onClick={() => clickHandler("/decks/new")}
      >
        Create Deck
      </button>
      {showDeck}
    </React.Fragment>
  );
}
