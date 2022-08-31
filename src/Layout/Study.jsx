import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

import CardList from "./Cards/CardList";
import Breadcrumbs from "./Breadcrumbs";

export default function Study() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function scanDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
      } catch (err) {
        console.log(err);
      }
    }
    deckId && scanDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  const deckName = deck.name !== undefined ? `${deck.name}: ` : null;
  const breadName = deck.name !== undefined ? deck.name : null;

  if (Object.keys(deck).length) {
    return (
      <React.Fragment>
        {/* Breadcrumb nav bar*/}
        <Breadcrumbs
          pathName={`/decks/${deck.id}`}
          deckName={breadName}
          pageName="Study"
        />
        {/* Title */}
        <div>
          <h1>{deckName}Study</h1>
        </div>

        {/* List */}
        <CardList cards={deck.cards} />
      </React.Fragment>
    );
  } else {
    return null;
  }
}
