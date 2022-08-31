import React, { useEffect, useState } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";

import Breadcrumbs from "../Breadcrumbs";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const intialFormState = {
    id: "",
    name: "",
    description: "",
  };
  const [editDeck, setEditDeck] = useState({ ...intialFormState });
  const { path } = useRouteMatch();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    async function editExistingDeck() {
      try {
        setEditDeck(await readDeck(deckId, abortController.signal));
      } catch (error) {
        console.log(error);
      }
    }
    deckId && editExistingDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);

  async function addEditDeck() {
    const abortController = new AbortController();
    return await updateDeck(editDeck, abortController.signal);
  }

  const handleChange = (event) => {
    setEditDeck({ ...editDeck, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEditDeck();
    history.push(`/decks/${editDeck.id}`);
    setEditDeck({ ...intialFormState });
  };

  return (
    <React.Fragment>
      <Breadcrumbs
        pathName={path}
        deckName={editDeck.name}
        pageName="Edit Deck"
      />
      <DeckForm
        formName="Edit Deck"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        deck={editDeck}
      />
    </React.Fragment>
  );
}
