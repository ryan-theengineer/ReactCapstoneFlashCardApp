import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";

import Breadcrumbs from "../Breadcrumbs";
import CardForm from "./CardForm";
// This component EditCard uses the CardForm component to display/complete the edits for cards.
// It has all the functionality while leaving the visual to the CardForm itself.

export default function EditCard() {
  const [deck, setDeck] = useState([]);
  const { deckId, cardId } = useParams();
  const history=useHistory();
  const initialEditCard = {
    front: "",
    back: "",
  };

  const [editCard, setEditCard] = useState({ ...initialEditCard });

  useEffect(() => {
    const abortController = new AbortController();
    async function viewDeck() {
      try {
        setDeck(await readDeck(deckId, abortController.signal));
        setEditCard(await readCard(cardId));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && viewDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId, cardId]);

  async function updateExistingCard() {
    const abortController = new AbortController();
    return await updateCard(editCard, abortController.signal);
  }

  const handleChange = (event) => {
    setEditCard({ ...editCard, [event.target.name]: event.target.value });
  }


  // This function calls the updateExistingCard function which uses the updateCard to update the API.
  // It then sends the user to the appropriate deck and finally resets the EditCard useState so that it can be used again later.
  const handleSubmit = (event) => {
    event.preventDefault();
    updateExistingCard();
    history.push(`/decks/${deck.id}`)
    setEditCard({ ...initialEditCard });
  }


  return (
    <React.Fragment>
      <Breadcrumbs
        pathName={`/decks/${deck.id}`}
        deckName={deck.name}
        pageName={`Edit Card ${editCard.id}`}
      />
      <h1>Edit Card</h1>
      <CardForm
        formName="Edit Card"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        card={editCard}
        deckId={deck.id}
      />
    </React.Fragment>
  );
}