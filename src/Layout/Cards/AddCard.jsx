import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";

import Breadcrumbs from "../Breadcrumbs";
import CardForm from "./CardForm";


// This component adds a new card using the functions in AddCard and the form itself from CardForm.

export default function AddCard() {
  const [deck, setDeck] = useState([]);
  const { deckId } = useParams();
  const initialNewCard = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState({ ...initialNewCard });

  useEffect(() => {
    const abortController = new AbortController();
    async function viewDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  async function addNewCard() {
    const abortController = new AbortController();
    return await createCard(deckId, newCard, abortController.signal);
  }

  const handleChange = (event) => {
    setNewCard({ ...newCard, [event.target.name]: event.target.value });
  }

// This function calls the addNewCard function which performs the creation of the card.
// It then resets the newCard usestate.  It doesn't send you anywhere in case you want to add more cards.

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewCard();
    setNewCard({ ...initialNewCard });
  }

  return (
    <React.Fragment>
      <Breadcrumbs
        pathName={`/decks/${deck.id}`}
        deckName={deck.name}
        pageName="Add Card"
      />
      <h1>{deck.name}: Add Card</h1>
      <CardForm
        formName="Add Card"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={newCard}
        deckId={deck.id}
      />
    </React.Fragment>
  );
}
