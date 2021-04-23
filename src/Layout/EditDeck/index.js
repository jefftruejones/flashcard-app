import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "../DeckForm";
function EditDeck({ decks, setUpdated }) {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        let result = await readDeck(deckId, abortController.signal);
        setDeck(result);
      } catch (error) {
        throw error;
      }
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setDeck({ name: deck.name, description: deck.description });
    const abortController = new AbortController();

    try {
      async function UpdateDeck() {
        let result = await updateDeck(deck, abortController.signal);

        setUpdated(result);
      }
      UpdateDeck();
    } catch (error) {
      throw error;
    }

    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <h1>test</h1>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill />
              &nbsp;Home
            </Link>
          </li>

          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Edit Deck</Link>
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <DeckForm
        decks={decks}
        deck={deck}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />
    </>
  );
}

export default EditDeck;
