import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { useState } from "react";
import { createDeck } from "../../utils/api";
import DeckForm from "../DeckForm";
function CreateDeck({ decks, setUpdated }) {
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState({ name: "", description: "" });

  const history = useHistory();

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    let deckId = decks.length + 1;
    setDeck({ name: deck.name, description: deck.description });
    const abortController = new AbortController();

    try {
      async function CreateDeck() {
        let result = await createDeck(deck, abortController.signal);

        setUpdated(result);
      }
      CreateDeck();
    } catch (error) {
      throw error;
    }

    history.push(`/decks/${deckId}`);
  };
  console.log(deck);
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill />
              &nbsp;Home
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Create Deck</Link>
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <DeckForm
        submitHandler={submitHandler}
        handleChange={handleChange}
        deck={deck}
        decks={decks}
      />
    </>
  );
}

export default CreateDeck;
