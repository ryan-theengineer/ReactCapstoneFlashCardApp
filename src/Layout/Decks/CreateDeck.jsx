import React, { useState } from "react";
import { createDeck } from "../../utils/api";
import { useRouteMatch, useHistory } from "react-router-dom";

import Breadcrumbs from "../Breadcrumbs";
import DeckForm from "./DeckForm";

export default function CreateDeck() {
  const intialForm = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState({ ...intialForm });
  const { path } = useRouteMatch();
  const history = useHistory();

  async function addDeck() {
    const abortController = new AbortController();
    return await createDeck(newDeck, abortController.signal);
  }

  const changeHandler = (event) => {
    setNewDeck({ ...newDeck, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addDeck().then(({ id }) => history.push(`/deck/${id}`));
    setNewDeck({ ...intialForm });
  };

  return (
    <React.Fragment>
      <Breadcrumbs pathName={path} deckName={null} pageName="Create Deck" />
      <DeckForm
        formName="Create Deck"
        handleSubmit={submitHandler}
        handleChange={changeHandler}
        deck={newDeck}
      />
    </React.Fragment>
  );
}
